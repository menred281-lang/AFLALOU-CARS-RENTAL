"use strict";
const button = document.getElementById("print-policy");
button.hidden = false;
button.addEventListener("click", () => window.print());
