using System.Security.Cryptography.X509Certificates;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Users()
        {
            return Ok(await _context.Users.AsNoTracking().ToListAsync());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var User = await _context.Users.FindAsync(id);
            if(User == null)
            {
                return NotFound();
            }
            return Ok(User);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User User)
        {

            if(User == null)
            {
                return BadRequest();
            }
            await _context.Users.AddAsync(User);
            await _context.SaveChangesAsync();
            return Ok(User);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User User)
        {
            if(id != User.Id)
            {
                return BadRequest();
            }
            _context.Entry(User).State = EntityState.Modified;
              await _context.SaveChangesAsync();

            //  return NoContent();
            return Ok(User);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var User = await _context.Users.FindAsync(id);
            if(User == null)
            {
                return NotFound();
            }
            _context.Users.Remove(User);
            await _context.SaveChangesAsync();

            return Ok(User);
        }
     
    }
}