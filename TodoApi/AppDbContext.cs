using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;



public class AppDbContext : DbContext
{
    public ISet<Item> Items { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModuleBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>()
            .Property(p => p.IsComplete)
            .HasColumnType("tinyint");
    }
}