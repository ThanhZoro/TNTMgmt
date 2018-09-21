using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace O2OCRM
{
    public class CommonDataHub : Hub
    {
        public async Task Send(string companyId, string message)
        {
            await Clients.All.SendAsync($"send-{companyId}", message);
        }

        public async Task Chat(string companyId, string message)
        {
            await Clients.All.SendAsync($"chat-{companyId}", message);
        }
    }
}
