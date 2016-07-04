// lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1

function parserSFEN(sfen) {
    var comps = sfen.split(" ");
    if (comps.length !== 4) {
        throw new Error("invalid sfen string:  " + sfen);
    }
    var board = parseBoard(comps[0]);
    var nextTurn = comps[1];
    var captures = parseCaptures(comps[2]);
    var nextCount = parseInt(comps[3]);
    return {
        board: board,
        nextTurn: nextTurn,
        captures: captures,
        nextCount: nextCount
    };
}

function parseBoard(str) {
    var rows = str.split("/");
    if (rows.length !== 9) {
        throw new Error("invalid table string: " + str);
    }
    return rows.map(function (row) {
        var pieces = row.match(/([1-9]|\+?[krbgsnlpKRBGSNLP])/g);
        var i = 0;
        var ret = [];
        for (var p of pieces) {
            if (p.match(/[1-9]/)) {
                for (var f = 0, fmax = parseInt(p); f < fmax; f++) {
                    ret[i++] = "";
                }
            } else {
                ret[i++] = p;
            }
        }
        return ret;
    });
}

function parseCaptures(captures) {
    var no = captures == "-";
    var bPieces = captures.match(/(\d*?[KRBGSNLP])/g);
    var wPieces = captures.match(/(\d*?[krbgsnlp])/g);
    return no ? {w: [], b: []} : {w: wPieces, b: bPieces};
}

module.exports = parserSFEN;