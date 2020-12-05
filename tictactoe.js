let prompt = require("prompt")
let board = [['','',''],['','',''],['','','']];
let net = require("net")
let socket = require('socket')
let server = net.createServer((c) => {
    c.on('end', () => {
      console.log('client disconnected');
    });
    c.on('data', (data)=>{
        console.log(data)
    })
    server.on("send",(arg)=>{
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
    for (i of board) {
        if (i[0] == i[1] && i[2] == i[1]&&board) {
            end();
        }
        let counter = 0;
        while (counter<3){
            if (board[0][counter]==board[1][counter]&&board[0][counter]==[board[2][counter]]&&board){
                end();
        }
        counter++;
    }
}
if ((board[1][1]==board[2][2]&&board[2][2]==board[3][3])||(board[3][1]==board[2][2]&&board[2][2]==board[1][3])&&board){
    end();
}
}
function changeboard(x,y){
    if (board[x][y]!=''){
        console.log("Err.UsedOrNotOption")
    }else{
        board[x][y] = player
    }
    printBoard()
}
function printBoard(){
    console.log("BOARD:")
    for( i in board){
    console.log(i[0],i[1],i[2])
    console.log("-----------")
    }
}

function end(){
    console.log("The End CheCk ThE bOaRd")
    process.kill()
}
function start(){
    console.log("Whats is the peer?None To wait")
    let peer = prompt.get()
    if (peer = "None"){
        server.listen(8090)
        console.log("Listening at 8090")

    }else{
        client.connect(8090, peer, function() {
            ErrCode = 0;
        });
        

    }
}
function PersonInput(){
    console.log("Select Line, 0-2")
    nput = prompt.get()
    console.log("Select col, 0-2")
    nput2 = prompt.get()
    board[nput][nput2] = "X"

    check()
    OutInput()

}

start()