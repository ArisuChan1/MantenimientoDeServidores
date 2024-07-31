using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApiTodoList.Contexts;
using WebApiTodoList.Models;

namespace WebApiTodoList.Interceptors
{
    public class ChangeLoggingInterceptor : SaveChangesInterceptor
    {
        public ChangeLoggingInterceptor()
        {
        }

        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            var context = eventData.Context as AppDbContext;
            if (context == null) return base.SavingChanges(eventData, result);

            LogChanges(context);
            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            var context = eventData.Context as AppDbContext;
            if (context == null) return base.SavingChangesAsync(eventData, result, cancellationToken);

            LogChanges(context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private void LogChanges(AppDbContext context)
        {
            var logs = new List<ChangeLog>();

            foreach (var entry in context.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified || e.State == EntityState.Deleted))
            {
                var log = new ChangeLog
                {
                    TableName = entry.Metadata.GetTableName(),
                    ChangeType = entry.State.ToString(),
                    ChangeDate = DateTime.Now,
                    User = "ADMIN",
                    OldValues = entry.State == EntityState.Modified || entry.State == EntityState.Deleted ? JsonConvert.SerializeObject(entry.OriginalValues.ToObject()) : null,
                    NewValues = entry.State == EntityState.Added || entry.State == EntityState.Modified ? JsonConvert.SerializeObject(entry.CurrentValues.ToObject()) : null
                };

                logs.Add(log);
            }

            context.ChangeLogs.AddRange(logs);
        }
    }
}