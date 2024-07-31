using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiTodoList.Contexts;
using WebApiTodoList.Models;

namespace WebApiTodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangeLogController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        // GET: api/ChangeLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChangeLog>>> GetChangeLogs()
        {
            return await _context.ChangeLogs
            .ToListAsync();
        }
    }
}
