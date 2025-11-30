import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cliente from './pages/cliente/novo';
import Cozinha from './pages/cozinha/fila';
import Motoboy from './pages/motoboy/rota';
import Gerencia from './pages/gerencia/caixa';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/pages/cliente/novo">Cliente</Link> | 
        <Link to="/pages/cozinha/fila">Cozinha</Link> | 
        <Link to="/pages/motoboy/rota">Motoboy</Link> | 
        <Link to="/pages/gerencia/caixa">Gerência</Link>
      </nav>
      <Routes>
        <Route path="/pages/cliente/novo" element={<Cliente />} />
        <Route path="/pages/cozinha/fila" element={<Cozinha />} />
        <Route path="/pages/motoboy/rota" element={<Motoboy />} />
        <Route path="/pages/gerencia/caixa" element={<Gerencia />} />
        <Route path="/" element={<Cliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
