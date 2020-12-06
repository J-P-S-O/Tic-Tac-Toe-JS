let prompt = require("prompt-sync")()
let board = [['','',''],['','',''],['','','']];
let net = require("net")

let me = undefined
let adv = undefined
const { EventEmitter } = require("events");


const firstEmitter = new EventEmitter();
let server = net.createServer((c) => {
    console.log("Connected")
    c.on('end', () => {
      console.log('client disconnected');
    });
    c.on('data', (data)=>{
        console.log(data)
        firstEmitter.emit("got",data)
    })
    firstEmitter.on("send",(arg)=>{
        c.write(arg.content)
    }) 
  });
  server.on('error', (err) => {
    throw err;
  });
  
let client = new net.Socket();
client.on('data', function(data) {    
    console.log('Client received: ' + data);
     if (data.toString().endsWith('exit')) {
       client.destroy();
    }
});

function check() {
    for (i in board) {
        console.log("board:"+board)
        console.log("i"+i)
        console.log(board[i])
        if (i[0] == i[1] && i[2] == i[1]&&(i[0]!= undefined)||i[0]!='') {
            console.log("end first")
            end();

        }
    }
        let counter = 0;
        while (counter<3){
            if (board[0][counter]==board[1][counter]&&board[0][counter]==[board[2][counter]]&&(board[0][counter]!=undefined)||board[0][counter]!=""){
                end();
        }
        counter++;
    }
    if ((board[0][0]==board[2][2]&&board[2][2]==board[1][1]&& board[1][1]!= undefined)||(board[2][0]==board[1][1]&&board[1][1]==board[0][2])&& board[1][1]!= undefined){
    end();
}
}


/*
function changeboard(x,y){
    if (board[x][y]!=''){
        console.log("Err.UsedOrNotOption")
    }else{
        board[x][y] = player
    }
    printBoard()
}
*/
function printBoard(){
    console.log(board)
}

function end(){
    console.log("The End CheCk ThE bOaRd")
    process.exit()
}
function start(){
    console.log(board)
    console.log("Whats is the peer?None To wait")
    let peer = prompt()
    if (peer == "None"){
        me = "X"
        server.listen(8090)
        console.log("Listening at 8090")
        adv = "P"
    }else{
        me = "P"
        adv = "X"
        client.connect(8090, peer, function() {
            ErrCode = 0;
            console.log("connected")
        });
        
        PersonInput()
    }
}
function PersonInput(){
    console.log("Select Line, 0-2")
    nput = prompt()
    console.log("Select col, 0-2")
    nput2 = prompt()
    board[nput][nput2] = me
printBoard()
    firstEmitter.emit("send",{content: nput+nput2})
    OutInput()
    check()
}
async function OutInput(){
    let outerinput = 0
    client.on('data', function(data) {    
        console.log('Client received: ' + data);
         if (data.toString().endsWith('exit')) {
           client.destroy();
        }
        outerinput = data.split("")
        board[int(outerinput[0])][int(outerinput[1])] = adv
        printBoard()
PersonInput()

    });
    
}
start()