// Importando hooks do React e o arquivo de estilos
import { useEffect, useState } from 'react';
import './App.css';

// Definindo a estrutura (interface) para o tipo Produto com os campos esperados
interface Produto {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
}

// Definindo a estrutura para o tipo Usuario com os campos que o backend retornará
interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataCriacao: string;     // Renomeado de 'created_at' para um termo mais claro
  dataAtualizacao: string; // Renomeado de 'updated_at' para um termo mais claro
}

// Função principal do componente App
function App() {
  // Declaração dos estados com hooks para armazenar os dados dinâmicos
  const [titulo, setTitulo] = useState("");              // Estado para o título principal da página
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]); // Estado para armazenar produtos
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]); // Estado para armazenar usuários

  // useEffect executa após o componente ser montado (carregar a página)
  useEffect(() => {
    setTitulo("Bem-vindo ao Marketplace");  // Define o título após a montagem

    // Requisição GET para buscar dados de produtos no backend
    fetch("https://one022b-marketplace-ibug.onrender.com/produtos")
      .then(resposta => resposta.json())   // Converte a resposta para JSON
      .then(dados => setListaProdutos(dados)); // Atualiza o estado com os produtos recebidos

    // Requisição GET para buscar dados de usuários no backend
    fetch("https://one022b-marketplace-ibug.onrender.com/usuarios")
      .then(resposta => resposta.json())    // Converte a resposta para JSON
      .then(dados => setListaUsuarios(dados)); // Atualiza o estado com os usuários recebidos
  }, []);  // A lista vazia `[]` significa que executa apenas na primeira montagem

  // Renderização do conteúdo do componente
  return (
    <>
      <h1>{titulo}</h1> {/* Exibe o título armazenado no estado */}

      {/* Seção de Produtos */}
      <section className="produtos-container">
        <h2>Lista de Produtos</h2>
        {/* Mapeia cada produto da lista e renderiza seu conteúdo */}
        {listaProdutos.map(item => (
          <div key={item.id} className="produto-item">
            <h3>{item.nome}</h3>
            <div className='imagem-container'>
              <img src={item.imagem} alt={`Imagem de ${item.nome}`} /> {/* Exibe a imagem do produto */}
            </div>
            <p>Preço: {item.preco}</p>
            <p>Descrição: {item.descricao}</p>
          </div>
        ))}
      </section>

      {/* Seção de Usuários */}
      <section className="usuarios-container">
        <h2>Lista de Usuários</h2>
        {/* Mapeia cada usuário da lista e renderiza seu conteúdo */}
        {listaUsuarios.map(usuario => (
          <div key={usuario.id} className="usuario-item">
            <h3>{usuario.nome}</h3>
            <p>Email: {usuario.email}</p>
            <p>Data de Criação: {usuario.dataCriacao}</p>
            <p>Última Atualização: {usuario.dataAtualizacao}</p>
          </div>
        ))}
      </section>
    </>
  );
}

// Exporta o componente App para ser usado em outros arquivos
export default App;
