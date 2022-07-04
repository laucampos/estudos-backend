function dadosUsuario(nome: string, data: string): string {
	const separator = '/';
	const dataEmArray = data.split(separator);

	return `Olá, me chamo ${nome}, nasci no dia ${dataEmArray[0]}, no mês ${dataEmArray[1]} e ano de ${dataEmArray[2]}.`;
}

console.log(dadosUsuario('Laura', '13/06/1993'));
