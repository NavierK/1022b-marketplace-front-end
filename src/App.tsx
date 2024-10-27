import { useEffect, useState } from 'react'
import './App.css'

type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

type UsuarioType = {
  id: number,
  nome: string,
  email: string,
  created_at: string,
  updated_at: string
}

function App() {
  const [nome, setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([])

  useEffect(() => {
    setNome("emule")

    // Buscar os dados de produtos no Backend
    fetch("https://one022b-marketplace-ibug.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))

    // Buscar os dados de usuários no Backend
    fetch("https://one022b-marketplace-ibug.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
  }, [])

  return (
    <>
      <h1>{nome}</h1>

      {/* Sessão de produtos */}
      <div className="produtos-container">
        <h2>Produtos</h2>
        {
          produtos.map(produto => {
            return (
              <div key={produto.id} className="produto-item">
                <h3>{produto.nome}</h3>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" />
                </div>
                <p>{produto.preco}</p>
                <p>{produto.descricao}</p>
              </div>
            )
          })
        }
      </div>

      {/* Sessão de usuários */}
      <div className="usuarios-container">
        <h2>Usuários</h2>
        {
          usuarios.map(usuario => {
            return (
              <div key={usuario.id} className="usuario-item">
                <h3>{usuario.nome}</h3>
                <p>ID: {usuario.id}</p>
                <p>Email: {usuario.email}</p>
                <p>Criado em: {usuario.created_at}</p>
                <p>Atualizado em: {usuario.updated_at}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
