using System.Collections.Concurrent;

namespace formulaOne.ChatService;

public class Shared_DB
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections;

    public Shared_DB()
    {
        _connections = new ConcurrentDictionary<string, UserConnection>();
    }

    public ConcurrentDictionary<string, UserConnection> Connections => _connections;
}