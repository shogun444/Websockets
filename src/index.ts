import ws, { WebSocket, WebSocketServer } from 'ws'

const wss = new WebSocketServer({port : 8080})



interface User{
  socket : WebSocket,
  roomId : number
}

let users  = []

wss.on('connection' , (socket)=> {

  socket.send('connection made')

  socket.on('message',(msg)=>{
    const parse = JSON.parse(msg.toString())

    if(parse.type === 'join'){
      const user : User= {
  roomId : parse.payload.roomId,
  socket : socket
      }
       users.push(user)
    }
    if(parse.type === 'chat'){
          const checkRoom = users.find(user => user.socket === socket)?.roomId

          users.forEach((user)=>{
            if(user.roomId === checkRoom)
            user.socket.send(parse.payload.message)
          })

          
    }
  })

})