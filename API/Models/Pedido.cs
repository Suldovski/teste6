namespace API.Models;

public class Pedido
{
    public int Id { get; set; }
    public string? Cliente { get; set; }
    public string? Produto { get; set; }
    public double ValorProduto { get; set; }
    public double DistanciaKm { get; set; }
    public double TaxaEntrega { get; set; }
    public double ValorTotal { get; set; }
    public string? Status { get; set; }
}
