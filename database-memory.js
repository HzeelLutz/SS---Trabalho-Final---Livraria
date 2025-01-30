import {randomUUID} from "node:crypto"
export class DatabaseMemory{
    #livros = new Map()
    getById(id){
        return this.#livros.get(id)
    }
    // Listando livros
    list(search){
        return Array.from(this.#livros.entries()).map((livroArray) => {
    // Primeira posição
            const id = livroArray[0]
    // Segunda posição
            const data = livroArray[1]

            return{
                id,
                ...data,
            }
        })
    // Retornando pesquisa
    .filter(livro => {
        if(search){
            return livro.titulo.includes(search)
        }
        return true
    })
    }
    // criando livro
    create(livro){
        // Gerando código aleatório de ID
        const livroID = randomUUID()
        this.#livros.set(livroID, livro)
    }
    // Atualizar o livro
    update(id, livro){
        this.#livros.set(id, livro)
    }
    // Apaga o livro
    delete(id){
        this.#livros.delete(id)    
    }
}