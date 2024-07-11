import { todoService } from '../services/todo.service.js'
import { userService } from '../../services/user.service.js'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'

export const IS_LOADING_TRUE = 'IS_LOADING_TRUE'
export const IS_LOADING_FALSE = 'IS_LOADING_FALSE'

const initialState = {
  todos: [],
  filterBy: todoService.getDefaultFilter(),
  loggedInUser: userService.getLoggedinUser(),
  isLoading: true,
}

export function todosReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_TODOS:
      return { ...state, todos: cmd.todos }
    case REMOVE_TODO:
      var todos = state.todos.filter((todo) => todo._id !== cmd.todoId)

      if (state.loggedInUser) {
        if (!state.loggedInUser.activities) {
          state.loggedInUser.activities = []
        }
        state.loggedInUser.activities.push(
          `Removed Todo ${action.todoId} at ${new Date()}`
        )
        console.log(state.loggedInUser)
      }
      return { ...state, todos }
    case ADD_TODO:
      if (state.loggedInUser) {
        if (!state.loggedInUser.activities) {
          state.loggedInUser.activities = []
        }
        state.loggedInUser.activities.push(
          `Added Todo ${action.savedTodo._id} at ${new Date(
            action.savedTodo.updatedAt
          )}`
        )
      }
      return { ...state, todos: [...state.todos, cmd.savedTodo] }
    case UPDATE_TODO:
      var todos = state.todos
      const newTodos = todos.map((todo) => {
        if (todo._id === cmd.savedTodo._id) {
          return cmd.savedTodo
        } else return todo
      })
      if (state.loggedInUser) {
        if (!state.loggedInUser.activities) {
          state.loggedInUser.activities = []
        }
        state.loggedInUser.activities.push(
          `Updated Todo ${action.savedTodo._id} at ${new Date(
            action.savedTodo.updatedAt
          )}`
        )
      }

      return { ...state, todos: newTodos }
    case SET_FILTER:
      return { ...state, filterBy: cmd.newFilter }
    case IS_LOADING_TRUE:
      return { ...state, isLoading: cmd.newIsLoading }
    case IS_LOADING_FALSE:
      return { ...state, isLoading: cmd.newIsLoading }
    default:
      return state
  }
}
