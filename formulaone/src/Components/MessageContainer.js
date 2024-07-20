import React from 'react';
import { Table } from 'react-bootstrap';

const MessageContainer = ({ messages }) => {
    return (
        <Table striped bordered>
            <tbody>
                {messages.map((message, index) => (
                    <tr key={index}>
                        <td>{message.user}: {message.message}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default MessageContainer;