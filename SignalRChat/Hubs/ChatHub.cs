using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string name, string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", name, message);
        }

        public async Task Join(string name)
        {
            await Clients.Others.SendAsync("Join", name);
        }
    }
}
