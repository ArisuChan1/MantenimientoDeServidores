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
    public class ServidoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServidoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Servidores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Servidor>>> GetServidores()
        {
            return await _context.Servidores.ToListAsync();
        }

        // GET: api/Servidores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Servidor>> GetServidor(int id)
        {
            var servidor = await _context.Servidores.FindAsync(id);

            if (servidor == null)
            {
                return NotFound();
            }

            return servidor;
        }

        // PUT: api/Servidores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServidor(int id, Servidor servidor)
        {
            if (id != servidor.Id)
            {
                return BadRequest();
            }

            _context.Entry(servidor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServidorExists(id))
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

        // POST: api/Servidores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Servidor>> PostServidor(Servidor servidor)
        {
            _context.Servidores.Add(servidor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServidor", new { id = servidor.Id }, servidor);
        }

        // DELETE: api/Servidores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServidor(int id)
        {
            var servidor = await _context.Servidores.FindAsync(id);
            if (servidor == null)
            {
                return NotFound();
            }

            _context.Servidores.Remove(servidor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServidorExists(int id)
        {
            return _context.Servidores.Any(e => e.Id == id);
        }
    }
}
