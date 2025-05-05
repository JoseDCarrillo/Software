using Microsoft.EntityFrameworkCore;
using Software.Models.Entity;
using System.Collections.Generic;

namespace Software.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
    }
}
