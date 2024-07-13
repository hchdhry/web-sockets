import react from "react"
import { useState } from "react"
import { Form } from "react-hook-form";

const WaitingRoom = ({joinChatRoom})=>
    {
        const [userName,setUserName] = useState();
        const [chatRoom,setChatRoom] = useState();

        return(
            <Form onSubmit={e=>{
                e.preventDefault()
                joinChatRoom(userName,chatRoom)


            }}>

            </Form>
        )

    }
    export default WaitingRoom