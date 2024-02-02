using Microsoft.AspNetCore.SignalR;

namespace WebChatServer.Hubs
{
    //client use this class inorder to send message
    //if server notify any client it will use this class
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> connectedClients = new Dictionary<string, string>();
        // this method will send notification to all clients
        // if client have to communicate, it will call <SendMessage()> method
        // if client have to receive notification from server it will use <ReceiveMessage> method.
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // Everyone will be notified except who have joined the chad
        public async Task JoinChat(string user, string message)
        {
            /*connectedClients[Context.ConnectionId] = user;
            await Clients.Others.SendAsync("ReceiveConnectedUsers", GetOtherConnectedUsers(user));
            await Clients.AllExcept(Context.ConnectionId).SendAsync("UserConnected", user);*/

            connectedClients[Context.ConnectionId] = user;

            var otherConnectedUsers = GetOtherConnectedUsers(user);
            await Clients.Caller.SendAsync("ReceiveConnectedUsers", otherConnectedUsers);
            await Clients.Others.SendAsync("ReceiveConnectedUsers", new List<string> { user });
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
            await Clients.Others.SendAsync("UserConnected", user);
            await Clients.Caller.SendAsync("UserConnected", otherConnectedUsers); // Send the connected users to the joining user
        }

        private async Task LeaveChat()
        {
            if (connectedClients.TryGetValue(Context.ConnectionId, out string user))
            {
                var message = $"{user} left the chat";
                await Clients.Others.SendAsync("ReceiveMessage", user, message);
                await Clients.All.SendAsync("UserDisconnected");
            }
        }

        private List<string> GetOtherConnectedUsers(string currentUser)
        {
            return connectedClients.Values.Where(user => user != currentUser).ToList();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await LeaveChat();
            await base.OnDisconnectedAsync(exception);

        }
    }
}