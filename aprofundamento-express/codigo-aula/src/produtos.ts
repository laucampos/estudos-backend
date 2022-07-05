export type Produto = {
    id: number,
    idVendedor: string,
    preco: number,
    isAtivo: boolean
}

export const produtos: Produto[] = [
    {
        id: 1,
        idVendedor: "v1",
        preco: 19.99,
        isAtivo: true
    },
    {
        id: 2,
        idVendedor: "v2",
        preco: 49.90,
        isAtivo: true
    },
    {
        id: 3,
        idVendedor: "v3",
        preco: 299.99,
        isAtivo: false
    },
    {
        id: 4,
        idVendedor: "v4",
        preco: 2050.99,
        isAtivo: false
    },
    {
        id: 5,
        idVendedor: "v5",
        preco: 199.90,
        isAtivo: true
    },
    {
        id: 6,
        idVendedor: "v1",
        preco: 90.25,
        isAtivo: false
    },
    {
        id: 7,
        idVendedor: "v2",
        preco: 149.00,
        isAtivo: true
    },
    {
        id: 8,
        idVendedor: "v3",
        preco: 122.35,
        isAtivo: false
    },
    {
        id: 9,
        idVendedor: "v4",
        preco: 1925.99,
        isAtivo: true
    },
    {
        id: 10,
        idVendedor: "v5",
        preco: 9.99,
        isAtivo: true
    }
]