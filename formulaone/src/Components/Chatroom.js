import {Col, Row} from "react-bootstrap"

const ChatRooom = ({messages})=> <div>
<Row className="px-5 py-5">
    <Col sm = {10}>
        <h2>chatRoom</h2>
        
    </Col>
    <Col>
    </Col>
</Row>
<Row className="px-5 py-5">
    <Col>
    <MessageContainer messages = {messages}/>
    </Col>
</Row>

</div>
export default ChatRooom