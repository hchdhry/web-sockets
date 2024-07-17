const MessageContainer = ({messages})=>
{
    return(
    messages.map((message,index)=>{
        
        <table striped bordered>
            <tr>
                <td>
                    {message.msg}
                </td>
            </tr>
        </table>
        
    })
)
}


export default MessageContainer