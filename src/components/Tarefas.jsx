import {useState, useEffect} from 'react'

const Tarefas = () => {

    //HOOK-useState - manipula o estado da variável e guarda os dados
    const [tarefas, setTarefas]=useState(()=>{
    const salvarTarefas = localStorage.getItem("item-tarefa");
    return salvarTarefas ? JSON.parse(salvarTarefas): [];
    });
    // useState para mainupular os dados que passar nos campos
    const [campo, setCampo]=useState("");

    //HOOK-useEffect - realiza um efeito colateral, no exemplo vai
    // carregar automaticamente as tarefas cadastradas.

    useEffect(()=>{
        localStorage.setItem("item-tarefa",JSON.stringifgit (tarefas));
    },[tarefas])
 

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default Tarefas
