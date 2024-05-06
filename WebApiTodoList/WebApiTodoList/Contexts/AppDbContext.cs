using Microsoft.EntityFrameworkCore;
using WebApiTodoList.Models;

namespace WebApiTodoList.Contexts
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Ambiente> Ambientes { get; set;}
        public DbSet<BaseDeDatos> BasesDeDatos { get; set;}
        public DbSet<Ciudad> Ciudades { get; set;}
        public DbSet<Estado> Estados { get; set;}
        public DbSet<EstadoMantenimiento> EstadosMantenimiento { get; set;}
        public DbSet<Mantenimiento> Mantenimientos { get; set;}
        public DbSet<Motor> Motores { get; set;}
        public DbSet<Pais> Paises { get; set;}
        public DbSet<Permiso> Permisos { get; set;}
        public DbSet<Razon> Razones { get; set;}
        public DbSet<Region> Regiones { get; set;}
        public DbSet<Rol> Roles { get; set;}
        public DbSet<RolesXPermisos> RolesXPermisos { get; set;}
        public DbSet<Servidor> Servidores { get; set;}
        public DbSet<SistemaOperativo> SistemasOperativos { get; set;}
        public DbSet<TipoServidor> TiposServidores { get; set;}
        public DbSet<Usuario> Usuarios { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
