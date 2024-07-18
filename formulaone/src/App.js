import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row ,Col} from 'react-bootstrap';
import WaitingRoom from './Components/waitingRoom';
import ChatRoom from "./Components/Chatroom"
import { useState } from 'react';
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr"

function App() {
  const [conn,setConnection] = useState();
  const [messages,setMessages] = useState([]);
  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5130/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceivedMessage", (user, message) => {
        console.log(`${user}: ${message}`);
      });
      conn.on("sendSpecificMessage",(userName,message)=>{
        setMessages(prevMsg=>[...prevMsg,{messages:message}]
        )
      })

      await conn.start();
      console.log("Connection started");

      await conn.invoke("joinSpecificGroup", { Username: userName, ChatRoom: chatRoom });
      console.log("Joined specific group");

      setConnection(conn);
    } catch (error) {
      console.error("Error joining chat room:", error);
    }
  };
  return (
    <div >
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm = "12">
            <h1>welcome</h1>
            </Col>
          </Row>
          {!conn?
          <WaitingRoom joinChatRoom={joinChatRoom}/>:
            <ChatRoom messages = {messages}/>}
        </Container>
      </main>
    </div>
  );
}

export default App;
