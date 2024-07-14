import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row ,Col} from 'react-bootstrap';
import WaitingRoom from './waitingRoom';
import { useState } from 'react';
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr"

function App() {
  const [conn,setConnection] = useState();
  const joinChatRoom = async(userName,chatRoom)=>
    {
      try{
        const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5130")
        .configureLogging(LogLevel.Information)
        .build()

        conn.on("joinSpecificGroup", (userName,mgs)=>{
          console.log("msg"+mgs)
        })
        await conn.start()
        await conn.invoke("joinSpecificGroup", { userName,chatRoom})
      }
      catch{}
    }
  return (
    <div >
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm = "12">
            <h1>welcome</h1>
            </Col>
          </Row>
          <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
