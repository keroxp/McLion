// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require("babel-register");
const electron = require("electron");
const React = require("react");
const redux = require("redux");
const Board = require("./client/board");
const render = require("react-dom").render;
localStorage.debug = true;
window.addEventListener("load", () => {
    render(
        <Board width={640} height={640} />,
        document.getElementById("app")
    );
    console.log("app started.");
});