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

export default function Gerencia() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [totalFaturado, setTotalFaturado] = useState(0);

  const carregarPedidos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pedido/faturamento');
      const data = await response.json();
      setPedidos(data);
      
      const soma = data.reduce((acc: number, pedido: Pedido) => acc + pedido.valorTotal, 0);
      setTotalFaturado(soma);
    } catch (error) {
      console.error('Erro ao carregar faturamento');
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h1>Prova de Luan Suldovski</h1>
      <h2>Gerência - Caixa</h2>
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h3>Total Faturado: R$ {totalFaturado.toFixed(2)}</h3>
      </div>
      <button onClick={carregarPedidos}>Atualizar</button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Valor Produto</th>
            <th>Taxa Entrega</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.produto}</td>
              <td>R$ {pedido.valorProduto.toFixed(2)}</td>
              <td>R$ {pedido.taxaEntrega.toFixed(2)}</td>
              <td>R$ {pedido.valorTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
