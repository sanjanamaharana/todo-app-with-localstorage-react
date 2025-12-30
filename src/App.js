// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";



function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState("");


  const handleEdit = (index, item) => {
    console.log("editing", index, item);
    setCurrentEdit(index);
    setCurrentEditedItem(item);

  }
  const handleUpdateTitle = (updatedTitle) => {
    setCurrentEditedItem((prev) =>{
      return{
      ...prev,
      title: updatedTitle,
      };
    });
  }
  const handleUpdateDescription = (updatedDescription) => {
    setCurrentEditedItem((prev) =>{
      return{
      ...prev,
      description: updatedDescription,
      };
    });
  }

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    let updatedTodos = [...allTodos];
    updatedTodos.push(newTodoItem);
    setAllTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setNewTitle('');  
    setNewDescription('');
  }
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setAllTodos(reducedTodo);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  }

  const handleComplete = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let completedTime = `${date}-${month}-${year} at ${hours}:${minutes}:${seconds}`;

    let filteredItem = {
      ...allTodos[index],
      completedTime: completedTime,
    }
    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.push(filteredItem);
    setCompletedTodos(updatedCompletedTodos);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  }
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    setCompletedTodos(reducedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
  }
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  const handleUpdateTodo = () => {
    let prevTodo = [...allTodos];
    prevTodo[currentEdit] = currentEditedItem;
    setAllTodos(prevTodo);
    localStorage.setItem('todolist', JSON.stringify(prevTodo));
    setCurrentEdit('');
    
  setCurrentEditedItem('');

  }
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="what's the task title? " />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="what's the task description? " />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add </button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)} >Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen === false && allTodos.map((item, index) => {
            if (currentEdit === index)
              return (<div className='edit_wrapper' key={index} >
                <input type="text" value={currentEditedItem.title} placeholder='Updated Title' onChange={(e) => handleUpdateTitle(e.target.value)} />
                <textarea value={currentEditedItem.description} rows={4} placeholder='Updated Description' onChange={(e) => handleUpdateDescription(e.target.value)} />
                <button type='button' onClick={handleUpdateTodo} className='primaryBtn'> Update </button>
              </div>)
            else {
              return (
                <div className='todo-list-item'>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
                    <BsCheckLg className='check-icon' title='complete?' onClick={() => handleComplete(index)} />
                    <AiOutlineEdit className='check-icon' title='edit?' onClick={() => handleEdit(index, item)} />
                  </div>
                </div>
              )
            }

          })}
          {isCompleteScreen === true && completedTodos.map((todo, index) => {
            return (
              <div className='todo-list-item'>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p><small>Complete On :{todo.completedTime}</small></p>

                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Delete?' />

                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
