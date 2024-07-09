const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams, useNavigate, Link } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { setIsLoadingFalse, setIsLoadingTrue } from '../store/todo.actions.js'

import { Loader } from './Loader.jsx'

export function TodoDetails() {
  const [todo, setTodo] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  const isLoading = useSelector((state) => state.isLoading)
  const user = useSelector((state) => state.loggedInUser)

  useEffect(() => {
    loadTodo().then(() => {
      setIsLoadingFalse(isLoading)
    })
  }, [params.todoId])

  function loadTodo() {
    return todoService
      .get(params.todoId)
      .then(setTodo)
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load todo')
        navigate('/todo')
      })
  }

  function onBack() {
    // If nothing to do here, better use a Link
    navigate('/todo')
    // navigate(-1)
  }

  if (!todo || isLoading) return <Loader />
  return (
    <section
      className={
        'todo-details' +
        (todo.importance <= 3
          ? ' light-importance'
          : undefined || todo.importance <= 7
          ? ' mid-importance'
          : undefined || todo.importance <= 10
          ? ' high-importance'
          : undefined)
      }
      style={{
        color: `${user.color}`,
      }}
    >
      <h1 className={todo.isDone ? 'done' : ''}>{todo.txt}</h1>
      <h2>{todo.isDone ? 'Done!' : 'In your list'}</h2>

      <h1>Todo importance: {todo.importance}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem
        accusantium, itaque ut voluptates quo? Vitae animi maiores nisi,
        assumenda molestias odit provident quaerat accusamus, reprehenderit
        impedit, possimus est ad?
      </p>
      <button onClick={onBack}>Back to list</button>
      <div>
        <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
        <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
      </div>
    </section>
  )
}
