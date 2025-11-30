using API.Models;

namespace API.Repositories;

public class PedidoRepository
{
    private readonly AppDataContext _context;

    public PedidoRepository(AppDataContext context)
    {
        _context = context;
    }

    public Pedido CriarPedido(Pedido pedido)
    {
        pedido.TaxaEntrega = CalcularTaxaEntrega(pedido.DistanciaKm);
        pedido.ValorTotal = pedido.ValorProduto + pedido.TaxaEntrega;
        pedido.Status = "Recebido";

        _context.Pedidos.Add(pedido);
        _context.SaveChanges();

        return pedido;
    }

    private double CalcularTaxaEntrega(double distanciaKm)
    {
        if (distanciaKm <= 2.0)
        {
            return 0.0;
        }
        else if (distanciaKm >= 2.1 && distanciaKm <= 5.0)
        {
            return 5.0;
        }
        else
        {
            return 10.0;
        }
    }

    public Pedido? AvancarStatus(int id)
    {
        var pedido = _context.Pedidos.Find(id);
        if (pedido == null) return null;

        switch (pedido.Status)
        {
            case "Recebido":
                pedido.Status = "Em Preparo";
                break;
            case "Em Preparo":
                pedido.Status = "Saiu para Entrega";
                break;
            case "Saiu para Entrega":
                pedido.Status = "Entregue";
                break;
            default:
                return null;
        }

        _context.SaveChanges();
        return pedido;
    }

    public List<Pedido> ListarCozinha()
    {
        return _context.Pedidos
            .Where(p => p.Status == "Recebido" || p.Status == "Em Preparo")
            .ToList();
    }

    public List<Pedido> ListarEntrega()
    {
        return _context.Pedidos
            .Where(p => p.Status == "Saiu para Entrega")
            .ToList();
    }

    public List<Pedido> ListarFaturamento()
    {
        return _context.Pedidos
            .Where(p => p.Status == "Entregue")
            .ToList();
    }
}
