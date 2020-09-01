using System;

namespace Prowriters.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MessageDetails { get; set; }
        public DateTime MessageDate { get; set; }
    }
}