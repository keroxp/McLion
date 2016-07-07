const React = require("react");
const ipc = require("electron").ipcRenderer;
const JKF = require("json-kifu-format");
const range = require("lodash").range;
const debug = require("debug")("client:baord");
class Board extends React.Component {
    static getPropTypes() {
        return {
            width: React.propTypes.number.isRequired,
            height: React.propTypes.number.isRequired
        }
    }

    constructor() {
        super();
    }

    onClick() {
        const v = this.refs.input.value;
        this.refs.input.value = "";
        debug(v);
    };

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1.0;
        let _ = (v) => v * dpr;
        const {width, height} = this.props;
        const pad = 42;
        const boarderWidth = 1;
        ctx.lineWidth = _(boarderWidth);
        ctx.strokeStyle = "#000000";
        ctx.lineJoin = "miter";
        ctx.lineCap = "square";
        const pWidth = _(60);
        const pLineWidth = _(2);

        ctx.lineWidth = pLineWidth;
        for (let i of range(0, 10)) {
            let xs = _(pad);
            let ys = _(pad);
            let xe = _(width - pad);
            let ye = _(height - pad);
            // 横線
            let y = ys + (pWidth + pLineWidth) * i;
            // 縦線
            let x = xs + (pWidth + pLineWidth) * i;
            if (i === 0 || i === 9) {
                ctx.lineWidth = _(3);
                xe += _(pLineWidth);
                ye += _(pLineWidth);
            } else {
                ctx.lineWidth = _(1);
            }
            ctx.beginPath();
            ctx.moveTo(xs, y);
            ctx.lineTo(xe, y);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, ys);
            ctx.lineTo(x, ye);
            ctx.closePath();
            ctx.stroke();
            // 文字
            if (i < 9) {
                const fs = _(18);
                const nums = ["一","二","三","四","五","六","七","八","九"];
                ctx.font = `bold ${fs}px Hiragino Kaku Gothic Pro`;
                ctx.fillText(`${9-i}`, x + (pWidth-fs) * .5, (pad+fs)*.5);
                ctx.fillText(nums[i], xe + (pad-fs)*.5, y + (pWidth+fs) * .5);
            }
        }
        // star
        const a = _(pad) + (pWidth + pLineWidth) * 3;
        const b = _(pad) + (pWidth + pLineWidth) * 6;
        for (let i of [[a, a], [a, b], [b, a], [b, b]]) {
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(i[0], i[1], _(3), 0, Math.PI*2, true);
            ctx.fill();
        }
    }

    render() {
        const {width, height} = this.props;
        const dpr = window.devicePixelRatio || 1.0;
        const pad = 42;
        let _ = (v) => v * dpr;
        return (
            <div id="board" style={ {width: `${width}px`, height: `${height}px` } }>
                <canvas id="boardCanvas" ref="canvas"
                        style={ {width: `${width*dpr}px`, height: `${height*dpr}px`} }
                        width={width} height={height}/>
                <div style= {{width: `${width-_(pad*2)}px`, height: `${height-_(pad*2)}px`, padding: `${pad}px`}}>
                    {}
                </div>
            </div>
        );
    }

}
module.exports = Board;