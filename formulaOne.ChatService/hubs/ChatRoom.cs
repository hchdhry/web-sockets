using Microsoft.AspNetCore.SignalR;

namespace formulaOne.ChatService;

public class ChatRoom : Hub
{
    public async Task joinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync(method:"RecievedMessage",arg1:"admin",arg2:$"{userConnection.Username} has joined")
    }

}
