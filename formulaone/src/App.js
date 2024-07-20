import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from 'react-bootstrap';
import WaitingRoom from './Components/waitingRoom';
import ChatRoom from "./Components/Chatroom"
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5130/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceivedMessage", (user, message) => {
        console.log(`${user}: ${message}`);
        setMessages(prevMsg => [...prevMsg, { user, message }]);
      });

      connection.on("sendSpecificMessage", (userName, message) => {
        setMessages(prevMsg => [...prevMsg, { user: userName, message }]);
      });

      await connection.start();
      console.log("Connection started");

      await connection.invoke("joinSpecificGroup", { Username: userName, ChatRoom: chatRoom });
      console.log("Joined specific group");

      setConnection(connection);
    } catch (error) {
      console.error("Error joining chat room:", error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm="12">
              <h1>Welcome</h1>
            </Col>
          </Row>
          {!conn ?
            <WaitingRoom joinChatRoom={joinChatRoom} /> :
            <ChatRoom messages={messages} sendMessage={sendMessage} />}
        </Container>
      </main>
    </div>
  );
}

export default App;