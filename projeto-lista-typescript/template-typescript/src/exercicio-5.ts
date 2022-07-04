type Funcionarios = {
    name: string,
    email: string,
    role: string
}


const dadosFuncionarios: Funcionarios[] = [
    { name: "Rogério", email: "roger@email.com", role: "user" },
    { name: "Ademir", email: "ademir@email.com", role: "admin" },
    { name: "Aline", email: "aline@email.com", role: "user" },
    { name: "Jéssica", email: "jessica@email.com", role: "user" },
    { name: "Adilson", email: "adilson@email.com", role: "user" },
    { name: "Carina", email: "carina@email.com", role: "admin" }
]

function filtraEmail(dadosFuncionarios: Funcionarios[]): string[] {
    return dadosFuncionarios
    .filter(dado => dado.role === "admin")
    .map(email => email.email)
}

console.log(filtraEmail(dadosFuncionarios))