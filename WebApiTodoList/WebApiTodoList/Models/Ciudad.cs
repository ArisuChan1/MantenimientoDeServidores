namespace WebApiTodoList.Models
{
    public class Ciudad
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required int IdRegion { get; set; }
    }
}
