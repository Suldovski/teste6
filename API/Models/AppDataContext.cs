using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
<<<<<<< HEAD
    public DbSet<Emprestimo> Emprestimos { get; set; }
=======
    public DbSet<Pedido> Pedidos { get; set; }
>>>>>>> ad7e5878ebd4ca8876fed3ae99d3e4a8da9e8aae

    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
<<<<<<< HEAD
        base.OnModelCreating(modelBuilder);
=======
        modelBuilder.Entity<Pedido>().ToTable("Pedidos");
>>>>>>> ad7e5878ebd4ca8876fed3ae99d3e4a8da9e8aae
    }
}
