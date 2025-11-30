import { useState } from 'react';

export default function Cliente() {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [distanciaKm, setDistanciaKm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      cliente,
      produto,
      valorProduto: parseFloat(valorProduto),
      distanciaKm: parseFloat(distanciaKm)
    };

    try {
      const response = await fetch('http://localhost:5000/api/pedido/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      alert(`Pedido criado! Taxa de entrega: R$ ${data.taxaEntrega.toFixed(2)}`);
      
      setCliente('');
      setProduto('');
      setValorProduto('');
      setDistanciaKm('');
    } catch (error) {
      alert('Erro ao criar pedido');
    }
  };

  return (
    <div>
      <h1>Prova de Luan Suldovski</h1>
      <h2>Cliente - Novo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={cliente} 
            onChange={(e) => setCliente(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Produto:</label>
          <input 
            type="text" 
            value={produto} 
            onChange={(e) => setProduto(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Valor do Produto (R$):</label>
          <input 
            type="number" 
            step="0.01" 
            value={valorProduto} 
            onChange={(e) => setValorProduto(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Distância (Km):</label>
          <input 
            type="number" 
            step="0.1" 
            value={distanciaKm} 
            onChange={(e) => setDistanciaKm(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Enviar Pedido</button>
      </form>
    </div>
  );
}
