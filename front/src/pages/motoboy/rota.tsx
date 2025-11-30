import { useState, useEffect } from 'react';

interface Pedido {
  id: number;
  cliente: string;
  produto: string;
  valorProduto: number;
  distanciaKm: number;
  taxaEntrega: number;
  valorTotal: number;
  status: string;
}

export default function Motoboy() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const carregarPedidos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pedido/entrega');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos');
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const confirmarEntrega = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/pedido/status/${id}`, {
        method: 'PATCH'
      });
      carregarPedidos();
    } catch (error) {
      alert('Erro ao confirmar entrega');
    }
  };

  return (
    <div>
      <h1>Prova de Luan Suldovski</h1>
      <h2>Motoboy - Rota de Entregas</h2>
      <button onClick={carregarPedidos}>Atualizar</button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Distância (Km)</th>
            <th>Valor Total</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.produto}</td>
              <td>{pedido.distanciaKm}</td>
              <td>R$ {pedido.valorTotal.toFixed(2)}</td>
              <td>
                <button onClick={() => confirmarEntrega(pedido.id)}>
                  Confirmar Entrega
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
