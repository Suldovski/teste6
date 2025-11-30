// URL base da API
const API_BASE = 'http://localhost:5000/api/biblioteca';

// Interfaces TypeScript
interface Emprestimo {
    id: number;
    livro: string;
    aluno: string;
    dataRetirada: string;
    dataPrevista: string;
    dataDevolucaoReal?: string;
    multa?: number;
    status: string;
}

interface NovoEmprestimoRequest {
    livro: string;
    aluno: string;
}

interface DevolucaoRequest {
    dataDevolucao: string;
}

// Função para formatar data
function formatarData(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

// Função para formatar moeda
function formatarMoeda(valor?: number): string {
    if (!valor) return 'R$ 0,00';
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// 1. NOVO EMPRÉSTIMO
document.getElementById('formNovoEmprestimo')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const livro = (document.getElementById('livro') as HTMLInputElement).value;
    const aluno = (document.getElementById('aluno') as HTMLInputElement).value;
    
    try {
        const response = await fetch(`${API_BASE}/retirar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ livro, aluno } as NovoEmprestimoRequest)
        });
        
        if (response.ok) {
            const emprestimo: Emprestimo = await response.json();
            alert(`Livro retirado! Data de entrega: ${formatarData(emprestimo.dataPrevista)}`);
            (document.getElementById('formNovoEmprestimo') as HTMLFormElement).reset();
            listarEmprestimos();
        } else {
            alert('Erro ao retirar livro');
        }
    } catch (error) {
        alert('Erro na comunicação com a API: ' + error);
    }
});

// 2. LISTAR EMPRÉSTIMOS
async function listarEmprestimos() {
    try {
        const response = await fetch(`${API_BASE}/listar`);
        
        if (response.ok) {
            const emprestimos: Emprestimo[] = await response.json();
            const tbody = document.querySelector('#tabelaHistorico tbody');
            
            if (tbody) {
                tbody.innerHTML = '';
                
                emprestimos.forEach(emp => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${emp.id}</td>
                        <td>${emp.livro}</td>
                        <td>${emp.aluno}</td>
                        <td>${formatarData(emp.dataRetirada)}</td>
                        <td>${formatarData(emp.dataPrevista)}</td>
                        <td>${emp.dataDevolucaoReal ? formatarData(emp.dataDevolucaoReal) : '-'}</td>
                        <td>${formatarMoeda(emp.multa)}</td>
                        <td>${emp.status}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }
    } catch (error) {
        alert('Erro ao listar empréstimos: ' + error);
    }
}

document.getElementById('btnListar')?.addEventListener('click', listarEmprestimos);

// 3. DEVOLUÇÃO
document.getElementById('formDevolucao')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = (document.getElementById('idDevolucao') as HTMLInputElement).value;
    const dataDevolucao = (document.getElementById('dataDevolucao') as HTMLInputElement).value;
    
    try {
        const response = await fetch(`${API_BASE}/devolver/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataDevolucao } as DevolucaoRequest)
        });
        
        if (response.ok) {
            const emprestimo: Emprestimo = await response.json();
            const resultadoDiv = document.getElementById('resultadoDevolucao');
            
            if (resultadoDiv) {
                if (emprestimo.multa && emprestimo.multa > 0) {
                    resultadoDiv.innerHTML = `<p><b>⚠️ Devolvido com atraso! Multa de ${formatarMoeda(emprestimo.multa)}</b></p>`;
                } else {
                    resultadoDiv.innerHTML = `<p><b>✓ Devolvido sem multa!</b></p>`;
                }
            }
            
            (document.getElementById('formDevolucao') as HTMLFormElement).reset();
            listarEmprestimos();
            listarAtrasados();
        } else {
            alert('Erro ao devolver livro');
        }
    } catch (error) {
        alert('Erro na comunicação com a API: ' + error);
    }
});

// 4. LISTAR ATRASADOS
async function listarAtrasados() {
    try {
        const response = await fetch(`${API_BASE}/atrasados`);
        
        if (response.ok) {
            const atrasados: Emprestimo[] = await response.json();
            const tbody = document.querySelector('#tabelaAtrasados tbody');
            
            if (tbody) {
                tbody.innerHTML = '';
                
                atrasados.forEach(emp => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${emp.id}</td>
                        <td>${emp.livro}</td>
                        <td>${emp.aluno}</td>
                        <td>${formatarData(emp.dataRetirada)}</td>
                        <td><b>${formatarData(emp.dataPrevista)}</b></td>
                        <td>${emp.status}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }
    } catch (error) {
        alert('Erro ao listar atrasados: ' + error);
    }
}

document.getElementById('btnAtrasados')?.addEventListener('click', listarAtrasados);

// Carregar dados iniciais
window.addEventListener('DOMContentLoaded', () => {
    listarEmprestimos();
    listarAtrasados();
});
