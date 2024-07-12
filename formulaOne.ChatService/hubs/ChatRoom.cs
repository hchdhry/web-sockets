using Microsoft.AspNetCore.SignalR;

namespace formulaOne.ChatService;

public class ChatRoom : Hub
{
    public async Task joinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync(method:"RecievedMessage",arg1:"admin",arg2:$"{userConnection.Username} has joined");

    }
    public async Task joinSpecificGroup (UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId,groupName:userConnection.ChatRooom);
        await Clients.Group(userConnection.ChatRooom).SendAsync(method: "RecievedMessage", arg1: "admin", arg2: $"{userConnection.Username} has joined");
    }


}
