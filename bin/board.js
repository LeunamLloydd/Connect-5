define(["require", "exports"], function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HEIGHT = 9;
  exports.WIDTH = 9;
  exports.IN_PROGRESS = -1;
  exports.EMPTY = 0;
  exports.P1 = 1;
  exports.P2 = 2;
  var Board = /** @class */ (function () {
      function Board(board) {
          if (board === undefined) {
              var cols = [];
              for (var x = 0; x < exports.WIDTH; x++) {
                  var col = [];
                  for (var y = 0; y < exports.HEIGHT; y++) {
                      col.push(0);
                  }
                  cols.push(col);
              }
              this.columns = cols;
          }
          else if (board instanceof Board) {
              var cols = [];
              for (var x = 0; x < exports.WIDTH; x++) {
                  var col = [];
                  for (var y = 0; y < exports.HEIGHT; y++) {
                      col.push(board.columns[x][y]);
                  }
                  cols.push(col);
              }
              this.columns = cols;
          }
          else {
              this.columns = board;
          }
      }
      Board.prototype.insert = function (player, colPos) {
          if (colPos < 0 || colPos >= exports.WIDTH)
              throw new Error('Invalid column number');
          var col = this.columns[colPos];
          if (col.every(function (p) { return p !== 0; }))
              throw new Error('Column already full');
          for (var i = 0; i < col.length; i++) {
              if (col[i] === 0) {
                  col[i] = player;
                  break;
              }
          }
      };
      Board.prototype.print = function (options) {
          if (options === void 0) { options = {}; }
          var _a = options.empty, empty = _a === void 0 ? '.' : _a, _b = options.player, player = _b === void 0 ? 'O' : _b, _c = options.opponent, opponent = _c === void 0 ? 'X' : _c;
          console.log('1 2 3 4 5 6 7 8 9');
          for (var y = exports.HEIGHT - 1; y >= 0; y--) {
              var line = '';
              for (var x = 0; x < exports.WIDTH; x++) {
                  var value = this.columns[x][y];
                  line += value === 0 ? empty : value === 1 ? player : opponent;
                  line += ' ';
              }
              console.log(line);
          }
      };
      Board.prototype.status = function () {
          function checkLine(a, b, c, d, e) {
              for (var _i = 0, _a = [a, b, c, d, e]; _i < _a.length; _i++) {
                  var para = _a[_i];
                  if (para === undefined)
                      throw new Error('Parameter is undefined');
              }
              return (a !== 0 && a === b && a === c && a === d && a === e);
          }
          
          // Check horizontal lines
          for (var x = 0; x < exports.WIDTH - 4; x++) {
              for (var y = 0; y < exports.HEIGHT; y++) {
                  if (checkLine(
                      this.columns[x][y],
                      this.columns[x + 1][y],
                      this.columns[x + 2][y],
                      this.columns[x + 3][y],
                      this.columns[x + 4][y]
                  )) {
                      return this.columns[x][y];
                  }
              }
          }
          
          // Check vertical lines
          for (var x = 0; x < exports.WIDTH; x++) {
              for (var y = 0; y < exports.HEIGHT - 4; y++) {
                  if (checkLine(
                      this.columns[x][y],
                      this.columns[x][y + 1],
                      this.columns[x][y + 2],
                      this.columns[x][y + 3],
                      this.columns[x][y + 4]
                  )) {
                      return this.columns[x][y];
                  }
              }
          }
          
          // Check top left to bottom right diagonals
          for (var x = 0; x < exports.WIDTH - 4; x++) {
              for (var y = 0; y < exports.HEIGHT - 4; y++) {
                  if (checkLine(
                      this.columns[x][y],
                      this.columns[x + 1][y + 1],
                      this.columns[x + 2][y + 2],
                      this.columns[x + 3][y + 3],
                      this.columns[x + 4][y + 4]
                  )) {
                      return this.columns[x][y];
                  }
              }
          }
          
          // Check bottom left to top right diagonals
          for (var x = 0; x < exports.WIDTH - 4; x++) {
              for (var y = 4; y < exports.HEIGHT; y++) {
                  if (checkLine(
                      this.columns[x][y],
                      this.columns[x + 1][y - 1],
                      this.columns[x + 2][y - 2],
                      this.columns[x + 3][y - 3],
                      this.columns[x + 4][y - 4]
                  )) {
                      return this.columns[x][y];
                  }
              }
          }
          
          // // Check down-right
          // for (let y = 0; y < WIDTH - 3; y++)
          //   for (let x = 0; x < HEIGHT - 3; x++)
          //     if (checkLine(this.columns[x][y], this.columns[x + 1][y + 1], this.columns[x + 2][y + 2], this.columns[x + 3][y + 3]))
          //       return this.columns[x][y];
          // // Check down-left
          // for (let x = 3; x < 7; x++)
          //   for (let y = 0; y < 3; y++)
          //     if (checkLine(this.columns[x][y], this.columns[x - 1][y + 1], this.columns[x - 2][y + 2], this.columns[x - 3][y + 3]))
          //       return this.columns[x][y];
          var hasEmpty = this.columns.some(function (col) { return col.some(function (row) { return row === 0; }); });
          if (!hasEmpty)
              return 0;
          return -1;
      };
      Board.prototype.getEmptyPositions = function () {
          var emptyPositions = [];
          for (var i = 0; i < exports.WIDTH; i++) {
              if (this.columns[i].some(function (e) { return e === 0; })) {
                  emptyPositions.push(i);
              }
          }
          return emptyPositions;
      };
      
      return Board;
  }());
  exports.Board = Board;
});