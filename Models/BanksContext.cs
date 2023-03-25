using Microsoft.EntityFrameworkCore;

namespace LABAPP3.Models;

public class BanksContext : DbContext
{
    public BanksContext(DbContextOptions<BanksContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Bank> Bank { get; set; }
}