using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/biblioteca")]
public class BibliotecaController : ControllerBase
{
    private readonly AppDataContext _context;

    public BibliotecaController(AppDataContext context)
    {
        _context = context;
    }

    [HttpPost("retirar")]
    public async Task<IActionResult> Retirar([FromBody] Emprestimo emprestimo)
    {
        emprestimo.DataRetirada = DateTime.Now;
        emprestimo.DataPrevista = DateTime.Now.AddDays(7);
        emprestimo.Status = "Emprestado";
        emprestimo.Multa = 0;

        _context.Emprestimos.Add(emprestimo);
        await _context.SaveChangesAsync();

        return Created("", emprestimo);
    }

    [HttpPatch("devolver/{id}")]
    public async Task<IActionResult> Devolver(int id, [FromBody] DevolucaoRequest request)
    {
        var emprestimo = await _context.Emprestimos.FindAsync(id);
        
        if (emprestimo == null)
        {
            return NotFound();
        }

        emprestimo.DataDevolucaoReal = request.DataDevolucao;
        emprestimo.Status = "Devolvido";

        if (request.DataDevolucao > emprestimo.DataPrevista)
        {
            TimeSpan atraso = request.DataDevolucao - emprestimo.DataPrevista;
            int diasAtraso = atraso.Days;
            emprestimo.Multa = diasAtraso * 2.50;
        }
        else
        {
            emprestimo.Multa = 0;
        }

        await _context.SaveChangesAsync();

        return Ok(emprestimo);
    }

    [HttpGet("listar")]
    public async Task<IActionResult> Listar()
    {
        var emprestimos = await _context.Emprestimos.ToListAsync();
        return Ok(emprestimos);
    }

    [HttpGet("atrasados")]
    public async Task<IActionResult> Atrasados()
    {
        var atrasados = await _context.Emprestimos
            .Where(e => e.Status == "Emprestado" && e.DataPrevista < DateTime.Now)
            .ToListAsync();
        
        return Ok(atrasados);
    }
}

public class DevolucaoRequest
{
    public DateTime DataDevolucao { get; set; }
}
