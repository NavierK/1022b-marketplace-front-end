import { useEffect, useState } from 'react';
import './App.css';

// Tipo para Produto
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

// Tipo para Usuário
type UsuarioType = {
  id: number;
  nome: string;
  email: string;
  created_at: string;
  updated_at: string;
};

function App() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

  useEffect(() => {
    // Definindo nome inicial da aplicação
    setNome("Guilherme Terenciani");

    // Fetch para obter dados dos produtos
    fetch("https://one022b-marketplace-ibug.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
      .catch(erro => console.error("Erro ao carregar produtos:", erro));

    // Fetch para obter dados dos usuários
    fetch("https://one022b-marketplace-ibug.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
      .catch(erro => console.error("Erro ao carregar usuários:", erro));
  }, []);

  return (
    <>
      <h1>{nome}</h1>

      {/* Exibindo Produtos */}
      <div className="produtos-container">
        <h2>Lista de Produtos</h2>
        {produtos.map(produto => (
          <div key={produto.id} className="produto-item">
            <h3>{produto.nome}</h3>
            <div className="container-imagem">
              <img src={produto.imagem} alt="Imagem do produto" />
            </div>
            <p>Preço: {produto.preco}</p>
            <p>Descrição: {produto.descricao}</p>
          </div>
        ))}
      </div>

      {/* Exibindo Usuários */}
      <div className="usuarios-container">
        <h2>Lista de Usuários</h2>
        {usuarios.map(usuario => (
          <div key={usuario.id} className="usuario-item">
            <h3>{usuario.nome}</h3>
            <p>ID: {usuario.id}</p>
            <p>Email: {usuario.email}</p>
            <p>Criado em: {usuario.created_at}</p>
            <p>Atualizado em: {usuario.updated_at}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
