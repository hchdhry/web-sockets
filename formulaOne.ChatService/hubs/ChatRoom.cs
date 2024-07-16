using Microsoft.AspNetCore.SignalR;

namespace formulaOne.ChatService;

public class ChatRoom : Hub
{
    private readonly Shared_DB _shared_DB;
    public ChatRoom(Shared_DB shared_DB)
    {
        _shared_DB =shared_DB;
    }
    public async Task joinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync(method: "ReceivedMessage", arg1:"admin",arg2:$"{userConnection.Username} has joined");

    }
    public async Task joinSpecificGroup (UserConnection userConnection)
    {
        _shared_DB.connections[Context.ConnectionId] = userConnection;
        await Groups.AddToGroupAsync(Context.ConnectionId,groupName:userConnection.ChatRooom);
        await Clients.Group(userConnection.ChatRooom).SendAsync(method: "ReceivedMessage", arg1: "admin", arg2: $"{userConnection.Username} has joined");
    }

    public async Task SendMessage(string Message)
    {
        if(_shared_DB.connections.TryGetValue(Context.ConnectionId,out UserConnection conn)){
            await Clients.Group(conn.ChatRooom).SendAsync(method: "sendSpecificMessage", arg1: conn.Username, arg2:Message);
        }

    }


}
