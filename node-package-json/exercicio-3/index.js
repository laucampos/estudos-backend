
//exercicio 3

const tarefa = ["comprar leite"]
const novaTarefa = process.argv[2]

const listaDeTarefas = [...tarefa, novaTarefa]

console.log(`Tarefa adicionada com sucesso! Tarefas: ${listaDeTarefas}`)
