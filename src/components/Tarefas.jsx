import { useState, useEffect } from 'react'

const Tarefas = () => {

    //HOOK-useState - manipula o estado da variavel e guarda os dados
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo] = useState("");

    //HOOK-useEffect- realiza um efeito colateral, no exemplo vai 
    //carregar automaticamente as tarefas cadastradas.

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas])

    //função adicionar tarefa

    const AdicionarTarefa = (e) => {
        //PREVINE O CARREGAMENTO AUTOMATICO DA PAGINA
        e.preventDefault();
        //VALIDA O CAMPO SE ESTIVER VAZIO
        if (!campo.trim()) return;

        //OBJETO NOVA TAREFA
        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };

        //SPREAD - PEGA O VALOR NOVO E JUNTA COM O ANTIGO
        setTarefas([...tarefas, novaTarefa]);
        //LIMPA TELA
        setCampo("");
    };

    //FUNÇÃO PARA REMOVER TAREFA
    const RemoverTarefa = (id) => {
        //COMPARA O ID QUE DESEJA REMOVAR COM QUE ESTA ESTA NO ARRAY
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa)
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-amber-100 rounded-2xl shadow-lg border border-gray-200 ">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center ">Minha Lista de Tarefas</h2>

                <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="flex-1 px-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-950"
                    />
                    <button type="submit" className="bg-amber-500 hover:bg-amber-600 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">
                        Adicionar
                    </button>
                </form>

                <ul className="space-y-3">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="flex items-center justify-around p-3 bg-amber-200 border border-amber-600 rounded-2xl shadow-xl hover:bg-amber-400 transition-colors">
                            <span className="text-shadow-amber-800 mr-2">{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => RemoverTarefa(tarefa.id)}
                                className="bg-red-500 hover:bg-red-600 font-medium px-3 py-1 rounded-2xl transition-colors cursor-pointer"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>

                {tarefas.length === 0 && <p className="text-center text-amber-700 italic mt-4">Nenhuma tarefa salva.</p>}
            </div>

        </>
    )
}

export default Tarefas
