using LABAPP3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LABAPP3.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BanksController : ControllerBase
{
    private readonly BanksContext? _db;

    public BanksController(BanksContext banksContext)

    {
        _db = banksContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bank>>> Get()
    {
        return await _db.Bank.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Bank>> Get(int id)
    {
        var bank = await _db.Bank.FirstOrDefaultAsync(x => x.Id == id);
        if (bank == null)
            return NotFound();
        return new ObjectResult(bank);
    }

    [HttpPost]
    public async Task<ActionResult<Bank>> Post(Bank bank)
    {
        if (bank == null) return BadRequest();
        _db.Bank.Add(bank);
        await _db.SaveChangesAsync();
        return Ok(bank);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Bank>> Put(Bank bank)
    {
        if (bank == null) return BadRequest();
        if (!_db.Bank.Any(x => x.Id == bank.Id)) return NotFound();

        _db.Update(bank);
        await _db.SaveChangesAsync();
        return Ok(bank);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Bank>> Delete(int id)
    {
        var bank = _db.Bank.FirstOrDefault(x => x.Id == id);
        if (bank == null) return NotFound();
        _db.Bank.Remove(bank);
        await _db.SaveChangesAsync();
        return Ok(bank);
    }
}