import { todoService } from '../services/todo.service.js'
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  UPDATE_TODO,
  IS_LOADING_TRUE,
  IS_LOADING_FALSE,
  store,
} from './store.js'

export function loadTodos(filterBy = {}) {
  return todoService
    .query(filterBy)
    .then((todos) => store.dispatch({ type: SET_TODOS, todos }))
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO

  return todoService
    .save(todo)
    .then((savedTodo) => store.dispatch({ type, savedTodo }))
}

export function setIsLoadingTrue(isLoading) {
  const newIsLoading = true
  return store.dispatch({ type: IS_LOADING_TRUE, newIsLoading })
}
export function setIsLoadingFalse(isLoading) {
  const newIsLoading = false
  return store.dispatch({ type: IS_LOADING_FALSE, newIsLoading })
}
