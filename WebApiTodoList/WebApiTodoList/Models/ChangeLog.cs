namespace WebApiTodoList.Models
{
    public class ChangeLog
    {
        public int Id { get; set; }
        public string? TableName { get; set; }
        public string? ChangeType { get; set; }
        public DateTime ChangeDate { get; set; }
        public string? OldValues { get; set; }
        public string? NewValues { get; set; }
        public string? User { get; set; }
    }

}
