// exercicio 2
const operacao = process.argv[2]
const primeiroNumero = Number(process.argv[3])
const segundoNumero = Number(process.argv[4])

function calculadora(operacao, primeiroNumero, segundoNumero) {
    if (operacao === "add") {
        return (primeiroNumero + segundoNumero)
    } else if (operacao === "sub") {
        return (primeiroNumero - segundoNumero)
    } else if (operacao === "mult"){
        return (primeiroNumero * segundoNumero)
    } else if (operacao === "div"){
        return (primeiroNumero / segundoNumero)
    } 
}

console.log(calculadora(operacao, primeiroNumero, segundoNumero))