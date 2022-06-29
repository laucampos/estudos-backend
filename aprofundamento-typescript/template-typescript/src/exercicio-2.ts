type Person = {
    firstName: string,
    age: number,
    favoriteColor: string,
}

enum RainbowColors {
    BLUE = "Azul",
    GREEN = "Verde",
    RED = "Vermelho",
    PURPLE = "Roxo",
    YELLOW = "Amarelo",
    ORANGE = "Laranja"
}


const firstPerson : Person = {
    firstName: "Laura",
    age: 29,
    favoriteColor: RainbowColors.BLUE
}

const secondPerson: Person = {
    firstName: process.argv[2],
    age: +(process.argv[3]),
    favoriteColor: RainbowColors.RED


}


console.table(firstPerson)
console.table(secondPerson)
