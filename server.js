// Importando o fastify
import { fastify } from "fastify";
// Importando DatabaseMemory
import { DatabaseMemory } from "./database-memory.js";
import { request } from "node:http";
// Criando nosso servidor
const server = fastify()
// Criando database
const database = new DatabaseMemory()
// Lendo um livro
server.get('/livros', (request) => {
    // Pegando a busca
    const search = request.query.search
    // Imprimir busca
    //console.log(search)
    //Acessando database
    const livros = database.list(search)
    //console.log(livros)
    //Retornando livro
    return livros
})
// Criando um livro
server.post('/livros', (request, reply) => {
    //Acessando dados do corpo
    const {titulo, autor, npaginas, editora} = request.body
    
    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
        editora: editora,
    })
    
    // retornando que foi criado
    return reply.status(201).send()
})
// Atualizar com PUT (todos os atributos)
server.put('/livros/:id', (request, reply) =>{
// Passando ID do livro
    const livroId = request.params.id
// Passando o restante dos atributos
    const {titulo, autor, npaginas, editora} = request.body
    const livro = database.update(livroId, {
        titulo,
        autor,
        npaginas,
        editora,
    })
// Sucesso sem conteudo
    return reply.status(204).send()
})
// Atualizar com PATCH (apenas os atributos necessarios)
server.patch('/livros/:id', (request, reply) =>{
    const livroId = request.params.id
    const update = request.body

    const lvE = database.getById(livroId)

    const lvN = {...lvE,...update}

    database.update(livroId, lvN)

    return reply.status(204).send()
})
// Excluir um registro 
server.delete('/livros/:id', (request, reply) =>{
    const livroId = request.params.id
    database.delete(livroId)
    return reply.status(204).send()
})
// Definindo a porta que vai rodar
server.listen({
    port: 3333,
})