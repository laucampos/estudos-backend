function checaRenovacaoRG() {
    const anoAtual = +(process.argv[2]);
    const anoNascimento = +(process.argv[3]);
    const anoEmissao = +(process.argv[4]);
    const idade = anoAtual - anoNascimento;
    const tempoCarteira = anoAtual - anoEmissao;
    const cond1 = idade <= 20 && tempoCarteira >= 5;
    const cond2 = idade > 20 && idade <= 50 && tempoCarteira >= 10;
    const cond3 = idade > 50 && tempoCarteira >= 15;
    return (cond1 || cond2 || cond3);
}
console.log(checaRenovacaoRG());
//# sourceMappingURL=index.js.map