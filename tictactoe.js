const prompt = require('prompt-sync')()
const board = [['', '', ''], ['', '', ''], ['', '', '']]
const net = require('net')
let waiting = false
let me
let adv
const { EventEmitter } = require('events')
const firstEmitter = new EventEmitter()
const client = new net.Socket()
client.on('data', function (data) {
  console.log('Client received: ' + data)
  if (waiting) {
    data += ''
    const moves = data.split('')
    console.log(moves)
    board[moves[0]][moves[1]] = adv
    printBoard()
    check()
    PersonInput()
  }
  if (data.toString().endsWith('exit')) {
    client.destroy()
  }
})

function check () {
  for (i in board) {
    if (board[i][0] == board[i][1] && board[i][2] == board[i][1] && (board[i][0] != '')) {
      console.log('end first')
      end()
    }
  }
  let counter = 0
  while (counter < 3) {
    if (board[0][counter] == board[1][counter] && board[0][counter] == [board[2][counter]] && (board[0][counter] != undefined) && board[0][counter] != '') {
      console.log(`ended at check ${counter}`)
      end()
    }
    counter++
  }
  if ((board[0][0] == board[2][2] && board[2][2] == board[1][1] && board[1][1] != '') || (board[2][0] == board[1][1] && board[1][1] == board[0][2]) && board[1][1] != '') {
    end()
  }
}

function changeboard (x, y) {
  if (board[x][y] != '') {
    console.log('Err.UsedOrNotOption')
  } else {
    const player = 'O'
    board[x][y] = player
  }
  printBoard()
}

function printBoard () {
  for (let i = 0; i++; i < board.length) {
    console.log(board[i][0], board[i][1], board[i][2])
    console.log('----------')
  }
}

function end () {
  console.log('The End CheCk ThE bOaRd')
  process.exit()
}
function start () {
  console.log(board)
  console.log('Whats is the peer?')
  const peer = prompt()
  me = 'O'
  adv = 'X'
  console.log('connecting')
  client.connect(8090, peer, function () {
    ErrCode = 0
    console.log('connected')
  })
  client.write('Hello')

  PersonInput()
}
function PersonInput () {
  console.log('Select Line, 0-2')
  const nput = prompt()
  console.log('Select col, 0-2')
  const nput2 = prompt()
  board[nput][nput2] = me
  printBoard()
  client.write(nput + nput2)

  OutInput()
  check()
}
async function OutInput () {
  waiting = true
};

start()
