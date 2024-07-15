using System.Collections.Concurrent;

namespace formulaOne.ChatService;

public class Shared_DB
{
    private readonly ConcurrentDictionary<string,UserConnection> _connections;

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}
