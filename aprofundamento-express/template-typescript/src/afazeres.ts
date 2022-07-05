//exercício 2 
export type Afazer = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export let afazeres: Afazer[] = [
    {
        userId: 1,
        id: 1,
        title: "tarefas de backend",
        completed: true,
    },
    {
        userId: 1,
        id: 2,
        title: "estudos de javascript",
        completed: false,
    },
    {
        userId: 2,
        id: 1,
        title: "assistir pantanal",
        completed: true,
    },
    {
        userId: 2,
        id: 2,
        title: "comer pizza",
        completed: false,
    }
]