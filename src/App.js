import './App.css';
import React, {useState} from "react"

function App() {

  const [toDoList, setTodoList] = useState([
    {name : "duck around", completed: false, priority : "high"},
    {name : "duck around", completed: false, priority : "high"},
  ])

  const [completedTodos, setCompletedTodos] = useState([
    {name: "I finished this or have I?", completed :true, priority:"high"}
  ])
  
  
  const [newTodo, setNewTodo] = useState("")
  const [priorityChoice, setPriority] = useState("")
  
  const addTodoItem = () => {
    const todoListCopy = [...toDoList]
    const newItem = {name: newTodo, completed: false, priority: priorityChoice}
    todoListCopy.push(newItem)
    setTodoList(todoListCopy)
  };
  
  const handleUserInput = (event) => {
    setNewTodo(event.target.value)
  };
  
  
  const handlePriority = (event) => {
    setPriority(event.target.value)
  };
  
  const handleChangePriority = (index) => {
    const copyTodoList = [...toDoList]
    const itemToChangePriority = {...copyTodoList[index]}
    itemToChangePriority.priority === "high" 
    ? itemToChangePriority.priority = "low"
    : itemToChangePriority.priority ="high"
    copyTodoList[index] = itemToChangePriority
    setTodoList(copyTodoList)    
  };

  const deleteTodo = (index) => {
    const copyTodoList = [...toDoList]
    copyTodoList.splice(index, 1)
    setTodoList(copyTodoList)
      
  };
  const deleteCompletedTodo = (index) => {
    const copyCompletedTodoList = [...completedTodos]
    copyCompletedTodoList.splice(index, 1)
    setCompletedTodos(copyCompletedTodoList)
      
  };
  
  const handleSubmit = (event) => {
    event.preventDefault()
    addTodoItem()
    setNewTodo("")
  };
  
  const markCompleted = (index) => {
    const copyTodoList = [...toDoList]
    const copyCompletedTodos = [...completedTodos]
    const taskToComplete = {...copyTodoList[index]}
    taskToComplete.completed = true
    copyTodoList.splice(index, 1)
    copyCompletedTodos.push(taskToComplete)
    setTodoList(copyTodoList)
    setCompletedTodos(copyCompletedTodos)
    
  };
  
  const markToBeCompleted = (index) => {
    const copyTodoList = [...toDoList]
    const copyCompletedTodos = [...completedTodos]
    const taskToComplete = {...copyCompletedTodos[index]}
    copyCompletedTodos.splice(index, 1)
    taskToComplete.completed = false
    copyTodoList.push(taskToComplete)
    setCompletedTodos(copyCompletedTodos)
    setTodoList(copyTodoList)
    
  };


  const displayTodoList = toDoList.map((item, index) => {
    return (
      <li className="todo" key={index}>
        <div className={item.completed
          ?"completed" 
          :item.priority}>
        <h3>
          {item.name}
          </h3>
          <h4 className="priority-field">Priority : {item.priority}</h4>

      <div className="buttons">
      <input type="submit" value="Change priority" onClick={() => handleChangePriority(index)} />
      <input type="submit" value="Delete Todo" onClick={() => deleteTodo(index)} />
      <input type="submit" value="Mark Done" onClick={() => markCompleted(index)} />
      </div>
      </div>
      </li>
      )
    })

    const displayCompletedTodos = completedTodos.map((item, index) => {
      return (<li className="todo" key={index}>
      <div className={item.completed
        ?"completed" 
        :item.priority}>
      <h3>
        {item.name}
        </h3>
        <h4 className="priority-field">Well done!! Task Completed</h4>
        <div className="buttons">
      <input type="submit" value="Delete Todo" onClick={() => deleteCompletedTodo(index)} />
      <input type="submit" value="Do again" onClick={() => markToBeCompleted(index)} />
      </div>
        </div>
        </li>
      )
    });

  return (
    <div className="top-bar">
    <h1>This is a ToDo's organizer</h1>
    <div className="add-new-todo-form">

    <form>
      <div>
      <label htmlFor="todo-input-field">New Todo Name: </label>
      <input id="todo-input-field" type="text" value={newTodo} onChange={handleUserInput}/>
      </div>
      <div className="priority-container">
        <p>Priority : </p>

      <label htmlFor="high">High</label>
      <input type="radio" name="priority" id="high" value="high" onClick={handlePriority}/>
                                                                
      <label htmlFor="low">Low</label>
      <input type="radio" name="priority" id="low" value="low" onClick={handlePriority}/>
      
      </div>
      <input type="submit" value="Save item" onClick={handleSubmit} />
    </form>
    </div>
    <hr />

    <div className="todo-container">

    <div className="incomplete-tasks-container">
    <h2>Tasks to be completed</h2>
    <hr />
    <ul className="todo-list">
    {displayTodoList}
    </ul>
    </div>

    <div className="completed-tasks-container">
    <h2>Completed Tasks</h2>
    <hr />
    <ul className="completed-tasks">
      {displayCompletedTodos}
    </ul>
    </div>
    </div>
    </div>

  );
}

export default App;
