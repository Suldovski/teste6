using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Repositories;

namespace API.Controllers;

[ApiController]
[Route("api/pedido")]
public class PedidoController : ControllerBase
{
    private readonly PedidoRepository _repository;

    public PedidoController(AppDataContext context)
    {
        _repository = new PedidoRepository(context);
    }

    [HttpPost("criar")]
    public IActionResult CriarPedido([FromBody] Pedido pedido)
    {
        var novoPedido = _repository.CriarPedido(pedido);
        return Ok(novoPedido);
    }

    [HttpPatch("status/{id}")]
    public IActionResult AvancarStatus(int id)
    {
        var pedido = _repository.AvancarStatus(id);
        if (pedido == null)
        {
            return NotFound("Pedido não encontrado ou já finalizado");
        }
        return Ok(pedido);
    }

    [HttpGet("cozinha")]
    public IActionResult ListarCozinha()
    {
        var pedidos = _repository.ListarCozinha();
        return Ok(pedidos);
    }

    [HttpGet("entrega")]
    public IActionResult ListarEntrega()
    {
        var pedidos = _repository.ListarEntrega();
        return Ok(pedidos);
    }

    [HttpGet("faturamento")]
    public IActionResult ListarFaturamento()
    {
        var pedidos = _repository.ListarFaturamento();
        return Ok(pedidos);
    }
}
