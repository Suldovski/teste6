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

export default function Cozinha() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const carregarPedidos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pedido/cozinha');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos');
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const avancarStatus = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/pedido/status/${id}`, {
        method: 'PATCH'
      });
      carregarPedidos();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  return (
    <div>
      <h1>Prova de Luan Suldovski</h1>
      <h2>Cozinha - Fila de Pedidos</h2>
      <button onClick={carregarPedidos}>Atualizar</button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.produto}</td>
              <td>{pedido.status}</td>
              <td>
                <button onClick={() => avancarStatus(pedido.id)}>
                  {pedido.status === 'Recebido' ? 'Iniciar Preparo' : 'Chamar Motoboy'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
