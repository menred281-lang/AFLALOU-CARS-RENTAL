param([string]$Browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe')
$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$artifacts = Join-Path ([IO.Path]::GetTempPath()) ('lawat-verify-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $artifacts | Out-Null
$htmlFiles = @(Get-ChildItem -LiteralPath $siteRoot -File -Recurse -Force | Where-Object { $_.Extension -in '.html','.htm' })
if ($htmlFiles.Count -ne 2 -or @($htmlFiles | Where-Object { $_.Name -notin 'index.html','privacy-policy.html' }).Count) { throw 'The project must contain exactly index.html and privacy-policy.html.' }
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 0)
$listener.Start(); $port = $listener.LocalEndpoint.Port; $listener.Stop()
$server = Start-Job -ArgumentList $siteRoot,$port -ScriptBlock {
  param($root,$port)
  $http = [Net.HttpListener]::new()
  $http.Prefixes.Add("http://127.0.0.1:$port/")
  $http.Start()
  try {
    while ($http.IsListening) {
      $context = $http.GetContext()
      try {
        $relative = [uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
        if (!$relative) { $relative = 'index.html' }
        $path = [IO.Path]::GetFullPath((Join-Path $root $relative))
        if (!$path.StartsWith($root + '\', [StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $path -PathType Leaf)) { $context.Response.StatusCode = 404 }
        else {
          $types = @{'.html'='text/html; charset=utf-8';'.js'='text/javascript; charset=utf-8';'.css'='text/css; charset=utf-8';'.jpg'='image/jpeg'}
          $context.Response.ContentType = $types[[IO.Path]::GetExtension($path)]
          $bytes = [IO.File]::ReadAllBytes($path)
          $context.Response.ContentLength64 = $bytes.Length
          $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
        }
      } finally { $context.Response.Close() }
    }
  } finally { $http.Stop(); $http.Close() }
}
$socket = $null
$browserProcess = $null
$script:commandId = 0
$script:browserErrors = [Collections.Generic.List[string]]::new()
function Send-CDP([string]$Method, $Parameters = @{}) {
  $script:commandId++
  $id = $script:commandId
  $json = @{id=$id;method=$Method;params=$Parameters} | ConvertTo-Json -Depth 30 -Compress
  $bytes = [Text.Encoding]::UTF8.GetBytes($json)
  $timeout = [Threading.CancellationTokenSource]::new(30000)
  try {
    $socket.SendAsync([ArraySegment[byte]]::new($bytes), [Net.WebSockets.WebSocketMessageType]::Text, $true, $timeout.Token).GetAwaiter().GetResult() | Out-Null
    while ($true) {
      $message = [IO.MemoryStream]::new()
      do {
        $buffer = New-Object byte[] 65536
        $received = $socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $timeout.Token).GetAwaiter().GetResult()
        $message.Write($buffer,0,$received.Count)
      } while (!$received.EndOfMessage)
      $response = [Text.Encoding]::UTF8.GetString($message.ToArray()) | ConvertFrom-Json
      $message.Dispose()
      if ($response.method -eq 'Runtime.exceptionThrown') { $script:browserErrors.Add(($response.params | ConvertTo-Json -Depth 10 -Compress)) }
      if ($response.id -eq $id) {
        if ($response.error) { throw ($response.error | ConvertTo-Json -Compress) }
        return $response.result
      }
    }
  } finally { $timeout.Dispose() }
}
function Eval-JS([string]$Expression) {
  $result = Send-CDP 'Runtime.evaluate' @{expression=$Expression;awaitPromise=$true;returnByValue=$true;userGesture=$true}
  if ($result.exceptionDetails) { throw ($result.exceptionDetails | ConvertTo-Json -Depth 10 -Compress) }
  return $result.result.value
}
function Navigate([string]$Path) {
  Send-CDP 'Page.navigate' @{url="http://127.0.0.1:$port/$Path"} | Out-Null
  Start-Sleep -Milliseconds 600
  Eval-JS "new Promise(resolve => { if (document.readyState === 'complete') resolve(true); else addEventListener('load', () => resolve(true), {once:true}); })" | Out-Null
}
try {
  $profile = Join-Path $artifacts 'profile'
  $arguments = @('--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1',"--user-data-dir=`"$profile`"",'about:blank')
  $browserProcess = Start-Process -FilePath $Browser -ArgumentList $arguments -WindowStyle Hidden -PassThru
  $activePort = Join-Path $profile 'DevToolsActivePort'
  for ($attempt=0; $attempt -lt 40 -and !(Test-Path -LiteralPath $activePort); $attempt++) { Start-Sleep -Milliseconds 250 }
  if (!(Test-Path -LiteralPath $activePort)) { throw 'Browser debugging endpoint did not start.' }
  $debugPort = (Get-Content -LiteralPath $activePort)[0]
  $pages = Invoke-RestMethod "http://127.0.0.1:$debugPort/json/list"
  $socket = [Net.WebSockets.ClientWebSocket]::new()
  $socket.ConnectAsync([uri]($pages | Where-Object type -eq 'page' | Select-Object -First 1).webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
  Send-CDP 'Runtime.enable' | Out-Null
  Send-CDP 'Page.enable' | Out-Null
  Send-CDP 'Emulation.setDeviceMetricsOverride' @{width=1440;height=1000;deviceScaleFactor=1;mobile=$false} | Out-Null
  Navigate 'index.html'
  $checks = Eval-JS (Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'verify-interactions.js'))
  $checks | ForEach-Object { Write-Output "PASS $_" }
  foreach ($width in @(1440,768,390,320)) {
    Send-CDP 'Emulation.setDeviceMetricsOverride' @{width=$width;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
    $overflow = Eval-JS 'document.documentElement.scrollWidth > innerWidth'
    if ($overflow) { throw "Horizontal overflow at $width px" }
    if ($width -eq 390) {
      $menu = Eval-JS "document.getElementById('menu-button').click(); const expanded = document.getElementById('menu-button').getAttribute('aria-expanded') === 'true'; document.querySelector('#mobile-menu a[href=`"#cars`"]').click(); expanded && document.getElementById('menu-button').getAttribute('aria-expanded') === 'false'"
      if (!$menu) { throw 'Mobile navigation failed' }
    }
    Write-Output "PASS Responsive layout: $width px"
  }
  Send-CDP 'Emulation.setDeviceMetricsOverride' @{width=1440;height=1000;deviceScaleFactor=1;mobile=$false} | Out-Null
  Navigate 'index.html?car=8#booking'
  $deepLink = Eval-JS "document.getElementById('booking-vehicle').value === '8' && Math.abs(document.getElementById('booking').getBoundingClientRect().top - 74) < 6"
  if (!$deepLink) { throw 'Booking deep link did not select/position correctly' }
  Write-Output 'PASS Booking deep link'
  Navigate 'privacy-policy.html'
  $privacy = Eval-JS "document.querySelector('h1').textContent === 'Privacy policy' && !document.getElementById('cars') && document.querySelector('a[href=`"index.html#cars`"]') !== null && document.getElementById('cookie-banner').hidden && localStorage.getItem('lawat-cookie-choice') === 'accept'"
  if (!$privacy) { throw 'Privacy navigation or shared cookie preference failed' }
  Write-Output 'PASS Separate privacy page and consent persistence'
  if ($script:browserErrors.Count) { throw ($script:browserErrors -join "`n") }
  Write-Output 'PASS No JavaScript exceptions'
  Write-Output 'PASS Exactly two HTML files in the whole project'
} finally {
  if ($socket -and $socket.State -eq [Net.WebSockets.WebSocketState]::Open) { try { Send-CDP 'Browser.close' | Out-Null } catch {} }
  if ($socket) { $socket.Dispose() }
  Stop-Job -Job $server
  Remove-Job -Job $server
  Write-Output "Browser artifacts: $artifacts"
}
