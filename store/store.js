import { userService } from '../services/user.service.js'
import { todoService } from '../services/todo.service.js'

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const IS_LOADING_TRUE = 'IS_LOADING_TRUE'
export const IS_LOADING_FALSE = 'IS_LOADING_FALSE'

export const SET_USER = 'SET_USER'

export const SET_FILTER = 'SET_FILTER'

const initialState = {
  todos: [],
  isLoading: true,
  filterBy: todoService.getDefaultFilter(),
  loggedInUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos }
    case REMOVE_TODO:
      var todos = state.todos.filter((todo) => todo._id !== action.todoId)

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
        console.log(state.loggedInUser)
      }
      return { ...state, todos: [...state.todos, action.savedTodo] }
    case UPDATE_TODO:
      console.log('bla')
      var todos = state.todos
      const newTodos = todos.map((todo) => {
        if (todo._id === action.savedTodo._id) {
          return action.savedTodo
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
    case IS_LOADING_TRUE:
      return { ...state, isLoading: action.newIsLoading }
    case IS_LOADING_FALSE:
      return { ...state, isLoading: action.newIsLoading }
    case SET_FILTER:
      return { ...state, filterBy: action.newFilter }
    default:
      return state
  }
}

export const store = createStore(appReducer)
window.gStore = store
