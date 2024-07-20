import { Col, Row } from "react-bootstrap"
import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessage"

const ChatRoom = ({ messages, sendMessage }) => (
    <div>
        <Row className="px-5 py-5">
            <Col sm={10}>
                <h2>ChatRoom</h2>
            </Col>
            <Col>
            </Col>
        </Row>
        <Row className="px-5 py-5">
            <Col>
                <MessageContainer messages={messages} />
                <SendMessageForm sendMessage={sendMessage} />
            </Col>
        </Row>
    </div>
)

export default ChatRoom