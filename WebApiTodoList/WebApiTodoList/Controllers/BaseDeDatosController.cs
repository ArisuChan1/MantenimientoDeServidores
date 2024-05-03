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
    public class BaseDeDatosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BaseDeDatosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/BaseDeDatos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BaseDeDatos>>> GetBasesDeDatos()
        {
            return await _context.BasesDeDatos.ToListAsync();
        }

        // GET: api/BaseDeDatos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseDeDatos>> GetBaseDeDatos(int id)
        {
            var baseDeDatos = await _context.BasesDeDatos.FindAsync(id);

            if (baseDeDatos == null)
            {
                return NotFound();
            }

            return baseDeDatos;
        }

        // PUT: api/BaseDeDatos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBaseDeDatos(int id, BaseDeDatos baseDeDatos)
        {
            if (id != baseDeDatos.Id)
            {
                return BadRequest();
            }

            _context.Entry(baseDeDatos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BaseDeDatosExists(id))
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

        // POST: api/BaseDeDatos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BaseDeDatos>> PostBaseDeDatos(BaseDeDatos baseDeDatos)
        {
            _context.BasesDeDatos.Add(baseDeDatos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBaseDeDatos", new { id = baseDeDatos.Id }, baseDeDatos);
        }

        // DELETE: api/BaseDeDatos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBaseDeDatos(int id)
        {
            var baseDeDatos = await _context.BasesDeDatos.FindAsync(id);
            if (baseDeDatos == null)
            {
                return NotFound();
            }

            _context.BasesDeDatos.Remove(baseDeDatos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BaseDeDatosExists(int id)
        {
            return _context.BasesDeDatos.Any(e => e.Id == id);
        }
    }
}
