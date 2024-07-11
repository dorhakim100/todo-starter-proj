import { TodoPreview } from './TodoPreview.jsx'
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  console.log(todos)
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        // (todo) => console.log(todo)
        <li
          key={todo._id}
          className={
            todo.importance <= 3
              ? 'todo light-importance'
              : undefined || todo.importance <= 7
              ? 'todo mid-importance'
              : undefined || todo.importance <= 10
              ? 'todo high-importance'
              : undefined
          }
        >
          <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
          <section>
            <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
            <button>
              <Link to={`/todo/${todo._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}
