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
    public class RazonesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RazonesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Razones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Razon>>> GetRazones()
        {
            return await _context.Razones.ToListAsync();
        }

        // GET: api/Razones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Razon>> GetRazon(int id)
        {
            var razon = await _context.Razones.FindAsync(id);

            if (razon == null)
            {
                return NotFound();
            }

            return razon;
        }

        // PUT: api/Razones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRazon(int id, Razon razon)
        {
            if (id != razon.Id)
            {
                return BadRequest();
            }

            _context.Entry(razon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RazonExists(id))
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

        // POST: api/Razones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Razon>> PostRazon(Razon razon)
        {
            _context.Razones.Add(razon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRazon", new { id = razon.Id }, razon);
        }

        // DELETE: api/Razones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRazon(int id)
        {
            var razon = await _context.Razones.FindAsync(id);
            if (razon == null)
            {
                return NotFound();
            }

            _context.Razones.Remove(razon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RazonExists(int id)
        {
            return _context.Razones.Any(e => e.Id == id);
        }
    }
}
