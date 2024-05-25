import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  // addtodo functionality 
  const addTodo =(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev]
  )
  }
// updatetodo functionality 
const updateTodo=(id,todo)=>{
  setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id?todo :prevTodo)))
  // ** second way for understanding  
  // prev.map((eachval)=>{
  //   if(eachval.id===id){
  //     todo
  //   }else{
  //     prevtodo
  //   }
  // })
}
// ** deletetodo 
const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
}
// **toggleComplete
const toggleComplete =(id)=>{
  setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo, completed:!prevTodo. completed} :prevTodo))
}
// **localStorage   jdo tak react ch ho ode tak directly run kr skde ha 
// for getItem
useEffect(() => {
  // localStorage.getItem("name of key") or hame value json me chahiye 
const todos = JSON.parse(localStorage.getItem("todos"))
if(todos && todos.length>0){
  setTodos(todos)

}
}, [])
useEffect(() => {
localStorage.setItem("todos",JSON.stringify(todos))
}, [todos])


  return (
    <>
      <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}} >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2 ">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>

                </div>
            ))}
          </div>
        </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
