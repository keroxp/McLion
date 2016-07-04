sfen = require("../src/server/sfen-parser")
{assert} = require("chai")

describe "sfen-parser", ->

  describe "SEFN文字列", ->

    it "が[null|undefined|]だったらErrorを投げる", ->
      (() -> sfen(null)).should.throw()
      (() -> sfen(undefined)).should.throw()

    it "が文字列でなかったらErrorを投げる", ->
      (() -> sfen({})).should.throw()
      (() -> sfen([])).should.throw()
      (() -> sfen(1)).should.throw()

    it "が空白４つで分けられていなかったらErrorを投げる", ->
      (() -> sfen("fasdfasd fsadf l;k")).should.throw()

    it "の盤面コンポーネントが/8つで分けられていなかったらErrorを投げる", ->
      (() -> sfen("fada/ffas/ffasd ff f f")).should.throw()

  describe "[正常系]", ->
    describe "lnsgkg+sn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1", ->
      ret = sfen("lnsgkg+sn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1")
      describe "board", ->
        it "が配列", -> assert.isArray(ret.board)
        it "の長さは9", -> assert.equal(ret.board.length, 9)

        for r in ret.board
          console.log r
          assert.equal(r.length, 9)

      it "nextTurnはw", ->
        assert.equal(ret.nextTurn, "w")
      it "capturesは空", ->
        assert.isObject(ret.captures)
        assert.isArray(ret.captures.w)
        assert.isArray(ret.captures.b)
        assert.deepEqual(ret.captures.w, [])
        assert.deepEqual(ret.captures.b, [])
      it "nextCountが1", ->
        assert.equal(ret.nextCount, 1)