import React, { Fragment, useState} from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {id:0, name:'Sketch'},
    {id:1, name:'Explore'},
    {id:2, name:'Go out'},
    {id:3, name:'Party'},
  ]);
  const [todoName, setTodoName] = useState('');
  const [id, setId] = useState(4);
  const [todoEditItem, setTodoEditItem] = useState(null);
  
  function addTodo(e) {
    e.preventDefault();
    setTodos([...todos, {id:id, name:todoName}])
    setId(id+1);
    console.log(todos);
  }

  function onDelete(id) {
    setTodos(
      todos => todos.filter(todo => todo.id !== id)
    )
  }

  function onEdit(todo) {
    setTodoEditItem({...todo});
  }

  function onDoneEdit() {
    setTodos(todos => {
      return todos.map(todo => {
        if(todo.id ===todoEditItem?.id) {
          return todoEditItem;
        }
        return todo;
      }
      )
    })
    setTodoEditItem(null);
  }

  function onTodoEditItemNameChange(e, name) {
    const newName = e.target.value;
    setTodoEditItem({...todoEditItem, name:newName})
  }

  return (
    <div>
      <ul>
        {todos.map(todo => {
          const isEditing = todoEditItem?.id === todo.id;
          return (<li key={todo.id}>
            {!isEditing && <Fragment>{todo.name}</Fragment>}
            {isEditing && <input placeholder='Enter Text to edit ToDo' value={todoEditItem.name} onChange={onTodoEditItemNameChange}/>}
            {!isEditing && <button onClick={() => onEdit(todo)}>Edit</button>}
            {isEditing && <button onClick={() => onDoneEdit()}>Done</button>}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
            </li>)
          }
        )
        }
      </ul>
      <form onSubmit={addTodo}>
        <input placeholder='Enter Todo Item' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default App;
