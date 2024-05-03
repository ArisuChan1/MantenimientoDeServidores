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
    public class MotoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MotoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Motores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Motor>>> GetMotores()
        {
            return await _context.Motores.ToListAsync();
        }

        // GET: api/Motores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Motor>> GetMotor(int id)
        {
            var motor = await _context.Motores.FindAsync(id);

            if (motor == null)
            {
                return NotFound();
            }

            return motor;
        }

        // PUT: api/Motores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMotor(int id, Motor motor)
        {
            if (id != motor.Id)
            {
                return BadRequest();
            }

            _context.Entry(motor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MotorExists(id))
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

        // POST: api/Motores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Motor>> PostMotor(Motor motor)
        {
            _context.Motores.Add(motor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMotor", new { id = motor.Id }, motor);
        }

        // DELETE: api/Motores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMotor(int id)
        {
            var motor = await _context.Motores.FindAsync(id);
            if (motor == null)
            {
                return NotFound();
            }

            _context.Motores.Remove(motor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MotorExists(int id)
        {
            return _context.Motores.Any(e => e.Id == id);
        }
    }
}
