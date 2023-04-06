using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using MyNotesApi.Entities;
using MyNotesApi.Entities.Base;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MyNotesApi.Contexts
{
    public class PostgreSqlDbContext:DbContext
    {
        public PostgreSqlDbContext(DbContextOptions<PostgreSqlDbContext> options):base(options) 
        {

        }
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options) //Databasede configurationları buradan yapabiliriz
        {
            if (!options.IsConfigured)
            {
                options.UseNpgsql("User ID=postgres;Password=ukko7890;Server=localhost;Port=5432;Database=mynotes;IntegratedSecurity=true;Pooling=true;ConnectionLifetime=0;");
            }
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<BaseEntity>(); //Databasee herhangi bir işlem yaptığımızda, işlenen bütün objectleri yakalıyoruz ve statelerine göre istediğimiz işlemi yapabiliyoruz
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = DateTime.Now;
                }
                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedDate = DateTime.Now;
                }
            }
            return base.SaveChangesAsync();
        }
    }
}
