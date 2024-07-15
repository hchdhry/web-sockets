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
        await Groups.AddToGroupAsync(Context.ConnectionId,groupName:userConnection.ChatRooom);
        await Clients.Group(userConnection.ChatRooom).SendAsync(method: "ReceivedMessage", arg1: "admin", arg2: $"{userConnection.Username} has joined");
    }


}
