using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiTodoList.Contexts;
using WebApiTodoList.Models;

namespace WebApiTodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesXPermisosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RolesXPermisosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/RolesXPermisos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolesXPermisos>>> GetRolesXPermisos()
        {
            return await _context.RolesXPermisos.ToListAsync();
        }

        // GET: api/RolesXPermisos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RolesXPermisos>> GetRolesXPermisos(int id)
        {
            var rolesXPermisos = await _context.RolesXPermisos.FindAsync(id);

            if (rolesXPermisos == null)
            {
                return NotFound();
            }

            return rolesXPermisos;
        }

        // PUT: api/RolesXPermisos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolesXPermisos(int id, RolesXPermisos rolesXPermisos)
        {
            if (id != rolesXPermisos.Id)
            {
                return BadRequest();
            }

            _context.Entry(rolesXPermisos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolesXPermisosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RolesXPermisos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RolesXPermisos>> PostRolesXPermisos(RolesXPermisos rolesXPermisos)
        {
            _context.RolesXPermisos.Add(rolesXPermisos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolesXPermisos", new { id = rolesXPermisos.Id }, rolesXPermisos);
        }

        // DELETE: api/RolesXPermisos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolesXPermisos(int id)
        {
            var rolesXPermisos = await _context.RolesXPermisos.FindAsync(id);
            if (rolesXPermisos == null)
            {
                return NotFound();
            }

            _context.RolesXPermisos.Remove(rolesXPermisos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolesXPermisosExists(int id)
        {
            return _context.RolesXPermisos.Any(e => e.Id == id);
        }
    }
}
