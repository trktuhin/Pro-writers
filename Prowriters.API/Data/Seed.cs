using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Prowriters.API.Models;

namespace Prowriters.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            var existingUsers = _context.Users.ToList();
            if(existingUsers.Count != 0) return;
            // if(_context.Users.any)
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach(var us in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("IamPowerful", out passwordHash, out passwordSalt);
                us.PasswordHash = passwordHash;
                us.PasswordSalt = passwordSalt;
                us.Username = us.Username.ToLower();
                _context.Add(us);
            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}