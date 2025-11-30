namespace API.Models;

public class Emprestimo
{
    public int Id { get; set; }
    public string? Livro { get; set; }
    public string? Aluno { get; set; }
    public DateTime DataRetirada { get; set; }
    public DateTime DataPrevista { get; set; }
    public DateTime? DataDevolucaoReal { get; set; }
    public double? Multa { get; set; }
    public string? Status { get; set; }
}
