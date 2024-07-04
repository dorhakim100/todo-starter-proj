const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { loadTodos, removeTodo, saveTodo } from '../store/todo.actions.js'
import { setIsLoadingFalse, setIsLoadingTrue } from '../store/todo.actions.js'

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { Loader } from './Loader.jsx'
import { swal } from '../lib/swal.js'

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  const isLoading = useSelector((state) => state.isLoading)

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  // const [filterBy, setFilterBy] = useState(defaultFilter)
  const filterBy = useSelector((state) => state.filterBy)

  useEffect(() => {
    setSearchParams(filterBy)
    // todoService.query(filterBy)
    //     .then(todos => setTodos(todos))
    //     .catch(err => {
    //         console.eror('err:', err)
    //         showErrorMsg('Cannot load todos')
    //     })
    loadTodos(filterBy)
      .then((todos) => {
        // console.log(isLoading)
        setIsLoadingFalse(isLoading)
        showSuccessMsg('Todos loaded successfully')
      })
      .catch((err) => showErrorMsg('Error'))
  }, [filterBy])

  function onRemoveTodo(todoId) {
    Swal.fire({
      title: 'Do you want to delete the todo?',
      showDenyButton: true,
      //   showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Removed!', '', 'success')
        removeTodo(todoId)
          .then(() => showSuccessMsg('Todo removed.'))
          .catch((err) => showErrorMsg('Error'))
      } else if (result.isDenied) {
        Swal.fire('Todo is not removed', '', 'info')
      }
    })
    // todoService
    //   .remove(todoId)
    //   .then(() => {
    //     setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
    //     showSuccessMsg(`Todo removed`)
    //   })
    //   .catch((err) => {
    //     console.log('err:', err)
    //     showErrorMsg('Cannot remove todo ' + todoId)
    //   })
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    // todoService
    //   .save(todoToSave)
    //   .then((savedTodo) => {
    //     setTodos((prevTodos) =>
    //       prevTodos.map((currTodo) =>
    //         currTodo._id !== todo._id ? currTodo : { ...savedTodo }
    //       )
    //     )
    //     showSuccessMsg(
    //       `Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`
    //     )
    //   })
    //   .catch((err) => {
    //     console.log('err:', err)
    //     showErrorMsg('Cannot toggle todo ' + todoId)
    //   })
    saveTodo(todoToSave)
      .then((savedTodo) => showSuccessMsg('Updated todo'))
      .catch((err) => showSuccessMsg('Error updating todo...'))
  }

  if (isLoading) return <Loader />
  return (
    <section className='todo-index'>
      <TodoFilter filterBy={filterBy} />
      <div>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: '60%', margin: 'auto' }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  )
}
