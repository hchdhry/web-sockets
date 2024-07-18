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
    public async Task joinSpecificGroup(UserConnection userConnection)
    {
        try
        {
            Console.WriteLine($"Attempting to join group for user: {userConnection.Username}, ChatRoom: {userConnection.ChatRoom}");

            _shared_DB.Connections[Context.ConnectionId] = userConnection;
            Console.WriteLine("User connection added to shared DB");

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: userConnection.ChatRoom);
            Console.WriteLine($"User added to group: {userConnection.ChatRoom}");

            await Clients.Group(userConnection.ChatRoom).SendAsync(method: "ReceivedMessage", arg1: "admin", arg2: $"{userConnection.Username} has joined");
            Console.WriteLine("Join message sent to group");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in joinSpecificGroup: {ex.Message}");
            Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while joining the group");
            throw;
        }
    }

    public async Task SendMessage(string Message)
    {
        if(_shared_DB.Connections.TryGetValue(Context.ConnectionId,out UserConnection conn)){
            await Clients.Group(conn.ChatRoom).SendAsync(method: "sendSpecificMessage", arg1: conn.Username, arg2:Message);
        }

    }


}
