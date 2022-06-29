type Estatisticas = {
	maior: number;
	menor: number;
	media: number;
};

function obterEstatisticas(numeros: number[]): Estatisticas {
	const numerosOrdenados: number[] = numeros.sort((a, b) => a - b);

	let soma: number = 0;

	for (let num of numeros) {
		soma += num;
	}

	const estatisticas: Estatisticas = {
		maior: numerosOrdenados[numeros.length - 1],
		menor: numerosOrdenados[0],
		media: soma / numeros.length
	};

	return estatisticas;
}

console.log(obterEstatisticas([13, 18, 150, 180]))
