var spawn = require("child_process").spawn;
var path = require("path");
var EventEmitter = require("events");
var Promise = require("es6-promise").Promise;
var EV_USI_RESPONSE = "EV_USI_RESPONSE";
var debug = require("debug")("usi-server");

var USIServer = function (enginePath, engineArgs) {
    this.enginePath = enginePath;
    this.engineArgs = engineArgs || [];
    this.event = new EventEmitter();
};

USIServer.prototype.run = function () {
    var cmd = path.basename(this.enginePath);
    var cwd = path.dirname(this.enginePath);
    debug("cmd = %s, cwd = %s", cmd, cwd);
    this.usi_process = spawn(
        "./" + cmd, this.engineArgs, {
            cwd: cwd
        }
    );

    var self = this;
    this.usi_process.stdout.on("data", function (rowData) {
        var res = new Buffer(rowData).toString("utf-8");
        res.split("\n").forEach(function (e) {
            debug("[response] : %s", e);
        });
        self.event.emit(EV_USI_RESPONSE, res);
    });
    this.usi_process.on("close", function () {
        debug("close");
    });
    this.usi_process.on("exit", function () {
        debug("exit");
    });
    if (this.usi_process.connected) {
        debug("Engine started. pid = %s", this.usi_process.pid);
    } else {
        debug("Failed to start engine");
    }
};

USIServer.prototype.command = function (command) {
    debug("[command] : %s", command);
    var self = this;
    return new Promise(function (resolve, rejecct) {
        self.event.once(EV_USI_RESPONSE, resolve);
        self.usi_process.stdin.write(command + "\n");
    });
};

USIServer.prototype.close = function () {
    this.usi_process.kill();
};

module.exports = USIServer;
