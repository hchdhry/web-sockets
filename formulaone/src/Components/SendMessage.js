import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState("");

    return (
        <Form onSubmit={e => {
            e.preventDefault()
            sendMessage(message)
            setMessage("");
        }}>
            <InputGroup>
                <Form.Control onChange={e => setMessage(e.target.value)} value={message} placeholder="type message" />
                <Button type="submit" variant="primary" disabled={!message}>Send</Button>
            </InputGroup>
        </Form>
    )
}

export default SendMessageForm