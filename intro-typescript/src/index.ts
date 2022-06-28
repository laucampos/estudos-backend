// //exercício 1

// function checaTriangulo(a: number, b: number, c: number) {
//     if (a !== b && b !== c) {
//       return "Escaleno";
//     } else if (a === b && b === c) {
//       return "Equilátero";
//     } else {
//       return "Isósceles";
//     }
//   }
  
//   console.log(checaTriangulo(7, 7, 7))
//   console.log(checaTriangulo(7, 7, 9))
//   console.log(checaTriangulo(7, 8, 9))

// //exercício 2

// function imprimeTresCoresFavoritas(): void {
//     const cor1: string = process.argv[2]
//     const cor2: string = process.argv[3]
//     const cor3: string = process.argv[4]
//     console.log([cor1, cor2, cor3])
//  }
 
//  imprimeTresCoresFavoritas()

//  //exercício 3

//  function checaAnoBissexto(ano: number): boolean{
//     const cond1 = ano % 400 === 0
//     const cond2 = (ano % 4 === 0) && (ano % 100 !== 0)
//     return cond1 || cond2   
//  }
 
//  console.log(checaAnoBissexto(+([process.argv[2]])))
//  console.log(checaAnoBissexto(2022))
//  console.log(checaAnoBissexto(2020))

//  //exercício 4

//  function comparaDoisNumeros(num1: number, num2: number): number {
//     let maiorNumero;
//     let menorNumero;
  
//     if (num1 > num2) {
//       maiorNumero = num1;
//       menorNumero = num2;
//     } else {
//       maiorNumero = num2;
//       menorNumero = num1;
//     }
  
//     const diferenca = maiorNumero - menorNumero;
  
//     return diferenca 
//   }
  
//   console.log(comparaDoisNumeros(20, 50))
//   console.log(comparaDoisNumeros(+(process.argv[2]), +(process.argv[3])))

  //exercício 5
  function checaRenovacaoRG(): boolean {
    const anoAtual: number = +(process.argv[2])
    const anoNascimento: number = +(process.argv[3])
    const anoEmissao: number = +(process.argv[4])
 
    const idade: number = anoAtual - anoNascimento
    const tempoCarteira: number = anoAtual - anoEmissao
 
    const cond1: boolean = idade <= 20 && tempoCarteira >= 5
    const cond2: boolean = idade > 20 && idade <= 50 && tempoCarteira >= 10
    const cond3: boolean = idade > 50 && tempoCarteira >= 15
 
    return (cond1 || cond2 || cond3)
 }
 
 console.log(checaRenovacaoRG())