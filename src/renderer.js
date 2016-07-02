// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var electron = require("electron");
var ipc = electron.ipcRenderer;

window.addEventListener("load",  function () {
    var input = document.getElementById("input");
    var button = document.getElementById("button");
    var ta = document.getElementById("textarea");
    button.addEventListener("click", function (e) {
        var v = input.value;
        console.log("command", v);
        ipc.send("usi:command", v);
        input.value = "";
    });
    console.log("command");
    ipc.on("usi:response", function (ev, arg) {
        console.log("usi:response");
        console.log(arg);
        ta.value = ta.value + "\n" + arg;
    });
    console.log("app started.");
});