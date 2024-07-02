import { userService } from '../services/user.service.js'

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const IS_LOADING_TRUE = 'IS_LOADING_TRUE'
export const IS_LOADING_FALSE = 'IS_LOADING_FALSE'

export const SET_USER = 'SET_USER'

const initialState = {
  todos: [],
  isLoading: true,
  loggedInUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos }
    case REMOVE_TODO:
      var todos = state.todos.filter((todo) => todo._id !== action.todoId)
      return { ...state, todos }
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] }
    case UPDATE_TODO:
      var todos = state.todos.map((todo) =>
        todo._id === action.car._id ? action.car : car
      )
      return { ...state, todos: action.todos }
    case IS_LOADING_TRUE:
      return { ...state, isLoading: action.newIsLoading }
    case IS_LOADING_FALSE:
      return { ...state, isLoading: action.newIsLoading }
    default:
      return state
  }
}

export const store = createStore(appReducer)
window.gStore = store
