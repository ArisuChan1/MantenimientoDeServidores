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
    public class TiposServidoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TiposServidoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TiposServidores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoServidor>>> GetTiposServidores()
        {
            return await _context.TiposServidores.ToListAsync();
        }

        // GET: api/TiposServidores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoServidor>> GetTipoServidor(int id)
        {
            var tipoServidor = await _context.TiposServidores.FindAsync(id);

            if (tipoServidor == null)
            {
                return NotFound();
            }

            return tipoServidor;
        }

        // PUT: api/TiposServidores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoServidor(int id, TipoServidor tipoServidor)
        {
            if (id != tipoServidor.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipoServidor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoServidorExists(id))
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

        // POST: api/TiposServidores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TipoServidor>> PostTipoServidor(TipoServidor tipoServidor)
        {
            _context.TiposServidores.Add(tipoServidor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoServidor", new { id = tipoServidor.Id }, tipoServidor);
        }

        // DELETE: api/TiposServidores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoServidor(int id)
        {
            var tipoServidor = await _context.TiposServidores.FindAsync(id);
            if (tipoServidor == null)
            {
                return NotFound();
            }

            _context.TiposServidores.Remove(tipoServidor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoServidorExists(int id)
        {
            return _context.TiposServidores.Any(e => e.Id == id);
        }
    }
}
