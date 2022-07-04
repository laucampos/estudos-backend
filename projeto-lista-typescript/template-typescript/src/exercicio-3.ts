enum GENERO {
    ACAO = "ação",
    DRAMA = "drama",
    COMEDIA = "comédia",
    ROMANCE = "romance",
    TERROR = "terror"
}

type Filme = {
    nome: string,
    anoLancamento: number,
    genero: string,
    pontuacao?: number
}

function catalogaFilme(nome: string, ano: number, genero: GENERO, pontuacao?: number): Filme {

    if (pontuacao) {
        return {
            nome: nome,
            anoLancamento: ano,
            genero: genero,
            pontuacao: pontuacao
        }
    } else {
        return {
            nome: nome,
            anoLancamento: ano,
            genero: genero
        }
    }

}

console.log(catalogaFilme("Clube da Luta", 1999, GENERO.ACAO, 10))