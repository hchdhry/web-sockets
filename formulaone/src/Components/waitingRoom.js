import react from "react"
import { useState } from "react"
import {Form,Row,Col, Button} from "react-bootstrap"

const WaitingRoom = ({joinChatRoom})=>
    {
        const [userName,setUserName] = useState();
        const [chatRoom,setChatRoom] = useState();


        return(
            <Form onSubmit={e=>{
                e.preventDefault()
                joinChatRoom(userName,chatRoom)
            }}>
                <Row className="px-5 py-5">
                    <Col>
                    <Form.Group>
                        <Form.Control placeholder = "username" onChange = {e=>setUserName(e.target.value)}/>

                        <Form.Control placeholder="chatroom" onChange={e => setChatRoom(e.target.value)} />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Button variant="success" type="submit">join</Button>
                    </Col>
                </Row>

            </Form>
        )

    }
    export default WaitingRoom