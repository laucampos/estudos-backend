import { User, USER_ROLE } from "../models/User"
import { Product } from "../models/Product"

export const users: User[] = [
    {
        id: "user1",
        email: "fulano@gmail.com",
        password: "fulano123",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user2",
        email: "ciclana@gmail.com",
        password: "ciclana99",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user3",
        email: "astrodev@gmail.com",
        password: "labenu00",
        role: USER_ROLE.ADMIN
    },
    {
        id: "user4",
        email: "johndoe@gmail.com",
        password: "doe11",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user5",
        email: "janedoe@gmail.com",
        password: "jane66",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user6",
        email: "brucewayne@gmail.com",
        password: "batman",
        role: USER_ROLE.ADMIN
    },
    {
        id: "user7",
        email: "peterparker@gmail.com",
        password: "amazing",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user8",
        email: "johnwick@gmail.com",
        password: "wick35",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user9",
        email: "frodo@gmail.com",
        password: "ring",
        role: USER_ROLE.NORMAL
    },
    {
        id: "user10",
        email: "sam@gmail.com",
        password: "sam123",
        role: USER_ROLE.NORMAL
    }
]

export const products: Product[] = [
    {
        id: "product1",
        name: "Impressora 3d",
        price: 1029.90
    },
    {
        id: "product2",
        name: "Celular Galaxy A03",
        price: 939.00
    },
    {
        id: "product3",
        name: "Furadeira sem fio",
        price: 179
    },
    {
        id: "product4",
        name: "Bicicleta aro 29",
        price: 1177
    },
    {
        id: "product5",
        name: "Kit caixa de ferramentas",
        price: 92.39
    },
    {
        id: "product6",
        name: "Celular iPhone 13 128gb",
        price: 5199.00
    },
    {
        id: "product7",
        name: "Kit 10 pares de meia cano longo",
        price: 112.59
    },
    {
        id: "product8",
        name: "Smart TV 32 polegadas",
        price: 1299.00
    },
    {
        id: "product9",
        name: "Chuveiro elétrico de parede",
        price: 474.90
    },
    {
        id: "product10",
        name: "Fone de ouvido sem fio",
        price: 207.00
    },
    {
        id: "product11",
        name: "Sanduicheira elétrica",
        price: 92.06
    },
    {
        id: "product12",
        name: "Máquina de lavar automática",
        price: 1999.00
    },
    {
        id: "product13",
        name: "Smart watch",
        price: 1359.00
    },
    {
        id: "product14",
        name: "Refletor LED 100w",
        price: 54.52
    },
    {
        id: "product15",
        name: "Nebulizador",
        price: 121.00
    },
    {
        id: "product16",
        name: "Micro-ondas 31L",
        price: 659.00
    },
    {
        id: "product17",
        name: "Robô aspirador",
        price: 429.90
    },
    {
        id: "product18",
        name: "Carregador de pilhas AA",
        price: 175.90
    },
    {
        id: "product19",
        name: "Ar condicionado de parede",
        price: 1299.00
    },
    {
        id: "product20",
        name: "Fogão de piso 4 bocas",
        price: 967.42
    }
]