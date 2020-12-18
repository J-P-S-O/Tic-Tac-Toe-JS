var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var prompt = require("prompt-sync")();
var board = [['', '', ''], ['', '', ''], ['', '', '']];
var net = require("net");
var waiting = false;
var me = undefined;
var adv = undefined;
var EventEmitter = require("events").EventEmitter;
var firstEmitter = new EventEmitter();
var client = new net.Socket();
client.on('data', function (data) {
    console.log('Client received: ' + data);
    if (waiting) {
        data += '';
        var moves = data.split("");
        console.log(moves);
        board[moves[0]][moves[1]] = adv;
        printBoard();
        check();
        PersonInput();
    }
    if (data.toString().endsWith('exit')) {
        client.destroy();
    }
});
function check() {
    for (i in board) {
        if (board[i][0] == board[i][1] && board[i][2] == board[i][1] && (board[i][0] != '')) {
            console.log("end first");
            end();
        }
    }
    var counter = 0;
    while (counter < 3) {
        if (board[0][counter] == board[1][counter] && board[0][counter] == [board[2][counter]] && (board[0][counter] != undefined) && board[0][counter] != "") {
            console.log("ended at check " + counter);
            end();
        }
        counter++;
    }
    if ((board[0][0] == board[2][2] && board[2][2] == board[1][1] && board[1][1] != '') || (board[2][0] == board[1][1] && board[1][1] == board[0][2]) && board[1][1] != '') {
        end();
    }
}
function changeboard(x, y) {
    if (board[x][y] != '') {
        console.log("Err.UsedOrNotOption");
    }
    else {
        board[x][y] = player;
    }
    printBoard();
}
function printBoard() {
    for (var i = 0; i++; i < board.length) {
        console.log(board[i][0], board[i][1], board[i][2]);
        console.log("----------");
    }
}
function end() {
    console.log("The End CheCk ThE bOaRd");
    process.exit();
}
function start() {
    console.log(board);
    console.log("Whats is the peer?");
    var peer = prompt();
    me = "O";
    adv = "X";
    console.log("connecting");
    client.connect(8090, peer, function () {
        ErrCode = 0;
        console.log("connected");
    });
    PersonInput();
}
function PersonInput() {
    console.log("Select Line, 0-2");
    var nput = prompt();
    console.log("Select col, 0-2");
    var nput2 = prompt();
    board[nput][nput2] = me;
    printBoard();
    client.write(nput + nput2);
    OutInput();
    check();
}
function OutInput() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            waiting = true;
            return [2 /*return*/];
        });
    });
}
;
start();
