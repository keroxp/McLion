// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require("electron");
const ipc = electron.ipcRenderer;

window.addEventListener("load", () => {
    const input = document.getElementById("input");
    const button = document.getElementById("button");
    const ta = document.getElementById("textarea");
    button.addEventListener("click", (e) => {
        const v = input.value;
        console.log("command", v);
        ipc.send("usi:command", v);
        input.value = "";
    });
    console.log("command");
    ipc.on("usi:response", (ev, arg) => {
        console.log("usi:response");
        console.log(arg);
        ta.value = ta.value + "\n" + arg;
    });
    console.log("app started.");
});