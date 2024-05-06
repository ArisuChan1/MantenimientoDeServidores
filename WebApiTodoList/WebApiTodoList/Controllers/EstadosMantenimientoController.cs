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
    public class EstadosMantenimientoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstadosMantenimientoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/EstadosMantenimiento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoMantenimiento>>> GetEstadosMantenimiento()
        {
            return await _context.EstadosMantenimiento.ToListAsync();
        }

        // GET: api/EstadosMantenimiento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoMantenimiento>> GetEstadoMantenimiento(int id)
        {
            var estadoMantenimiento = await _context.EstadosMantenimiento.FindAsync(id);

            if (estadoMantenimiento == null)
            {
                return NotFound();
            }

            return estadoMantenimiento;
        }

        // PUT: api/EstadosMantenimiento/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstadoMantenimiento(int id, EstadoMantenimiento estadoMantenimiento)
        {
            if (id != estadoMantenimiento.Id)
            {
                return BadRequest();
            }

            _context.Entry(estadoMantenimiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstadoMantenimientoExists(id))
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

        // POST: api/EstadosMantenimiento
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EstadoMantenimiento>> PostEstadoMantenimiento(EstadoMantenimiento estadoMantenimiento)
        {
            _context.EstadosMantenimiento.Add(estadoMantenimiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstadoMantenimiento", new { id = estadoMantenimiento.Id }, estadoMantenimiento);
        }

        // DELETE: api/EstadosMantenimiento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstadoMantenimiento(int id)
        {
            var estadoMantenimiento = await _context.EstadosMantenimiento.FindAsync(id);
            if (estadoMantenimiento == null)
            {
                return NotFound();
            }

            _context.EstadosMantenimiento.Remove(estadoMantenimiento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstadoMantenimientoExists(int id)
        {
            return _context.EstadosMantenimiento.Any(e => e.Id == id);
        }
    }
}
