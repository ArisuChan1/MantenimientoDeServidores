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
    public class SistemasOperativosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SistemasOperativosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/SistemasOperativos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SistemaOperativo>>> GetSistemasOperativos()
        {
            return await _context.SistemasOperativos.ToListAsync();
        }

        // GET: api/SistemasOperativos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SistemaOperativo>> GetSistemaOperativo(int id)
        {
            var sistemaOperativo = await _context.SistemasOperativos.FindAsync(id);

            if (sistemaOperativo == null)
            {
                return NotFound();
            }

            return sistemaOperativo;
        }

        // PUT: api/SistemasOperativos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSistemaOperativo(int id, SistemaOperativo sistemaOperativo)
        {
            if (id != sistemaOperativo.Id)
            {
                return BadRequest();
            }

            _context.Entry(sistemaOperativo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SistemaOperativoExists(id))
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

        // POST: api/SistemasOperativos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SistemaOperativo>> PostSistemaOperativo(SistemaOperativo sistemaOperativo)
        {
            _context.SistemasOperativos.Add(sistemaOperativo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSistemaOperativo", new { id = sistemaOperativo.Id }, sistemaOperativo);
        }

        // DELETE: api/SistemasOperativos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSistemaOperativo(int id)
        {
            var sistemaOperativo = await _context.SistemasOperativos.FindAsync(id);
            if (sistemaOperativo == null)
            {
                return NotFound();
            }

            _context.SistemasOperativos.Remove(sistemaOperativo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SistemaOperativoExists(int id)
        {
            return _context.SistemasOperativos.Any(e => e.Id == id);
        }
    }
}
