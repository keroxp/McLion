// lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1

function parserSFEN(sfen) {
    const comps = sfen.split(" ");
    if (comps.length !== 4) {
        throw new Error("invalid sfen string:  " + sfen);
    }
    const board = parseBoard(comps[0]);
    const nextTurn = comps[1];
    const captures = parseCaptures(comps[2]);
    const nextCount = parseInt(comps[3]);
    return {
        board: board,
        nextTurn: nextTurn,
        captures: captures,
        nextCount: nextCount
    };
}

function parseBoard(str) {
    const rows = str.split("/");
    if (rows.length !== 9) {
        throw new Error("invalid table string: " + str);
    }
    return rows.map((row) => {
        const pieces = row.match(/([1-9]|\+?[krbgsnlpKRBGSNLP])/g);
        let i = 0;
        const ret = [];
        for (const p of pieces) {
            if (p.match(/[1-9]/)) {
                for (let f = 0, fmax = parseInt(p); f < fmax; f++) {
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
    const no = captures == "-";
    const bPieces = captures.match(/(\d*?[KRBGSNLP])/g);
    const wPieces = captures.match(/(\d*?[krbgsnlp])/g);
    return no ? {w: [], b: []} : {w: wPieces, b: bPieces};
}

module.exports = parserSFEN;