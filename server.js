let prompt = require("prompt-sync")()
let board = [['','',''],['','',''],['','','']];
let net = require("net")
let me = "X"
let adv = "O"
let waiting = false
const { EventEmitter } = require("events");
const firstEmitter = new EventEmitter();
let server = net.createServer((c) => {
console.log(c)
    firstEmitter.on("send",(arg)=>{
        c.write(arg.content)
        waiting = true

	
    }) 
    console.log("connecting"+c)
    c.on('end', () => {
      console.log('client disconnected');
    });
    c.on('data', (data)=>{
        if (waiting){
        data = data +'';
		changeboard((data.split(""))[0],(data.split(""))[1])
        waiting = false
PersonInput()
    
}})
    
  });
  server.on('error', (err) => {
    throw err;
  });
  function check() {
    for (i in board) {
        
        if (board[i][0] == board[i][1] && board[i][2] == board[i][1]&&(board[i][0]!= '')) {
            console.log("end first")
            end();

        }
    }
        let counter = 0;
        while (counter<3){
            if (board[0][counter]==board[1][counter]&&board[0][counter]==[board[2][counter]]&&(board[0][counter]!=undefined)&& board[0][counter]!=""){
                console.log(`ended at check ${counter}`)
                end();
        }
        counter++;
    }
    if ((board[0][0]==board[2][2]&&board[2][2]==board[1][1]&& board[1][1]!= '')||(board[2][0]==board[1][1]&&board[1][1]==board[0][2])&& board[1][1]!= ''){
    end();
}
}


function printBoard(){
    for (i in board){
    console.log(board[i][0],board[i][1],board[i][2])
    console.log("----------")
}
}

function end(){
    console.log("The End CheCk ThE bOaRd")
    process.exit()
}
function start(){
    console.log(board)
    console.log("Hello, listening at 8090")
    
        me = "X"
        server.listen(8090)
        console.log("Listening at 8090")
        adv = "O"
   PersonInput() 
}
function changeboard(x,y){
    if (board[x][y]!=''){
        console.log("Err.UsedOrNotOption")
    }else{
        board[x][y] = adv
    }
    printBoard()
}
function PersonInput(){
    console.log("Select Line, 0-2")
    nput = prompt()
    console.log("Select col, 0-2")
    nput2 = prompt()
    board[nput][nput2] = me
    printBoard()
check()
    firstEmitter.emit("send",{content: nput+nput2})

   waiting = true

}
start()