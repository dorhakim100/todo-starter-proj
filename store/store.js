import { userService } from '../services/user.service.js'
import { todoService } from '../services/todo.service.js'

const { createStore, combineReducers, compose } = Redux

import { todosReducer } from './reducers/todos.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const IS_LOADING_TRUE = 'IS_LOADING_TRUE'
export const IS_LOADING_FALSE = 'IS_LOADING_FALSE'

export const SET_FILTER = 'SET_FILTER'

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const rootReducer = combineReducers({
  todosModule: todosReducer,
  userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

// const initialState = {
//   todos: [],
//   filterBy: todoService.getDefaultFilter(),
//   isLoading: true,
//   loggedInUser: userService.getLoggedinUser(),
// }

// function appReducer(state = initialState, action = {}) {
//   switch (action.type) {
//     case SET_TODOS:
//       return { ...state, todos: action.todos }
//     case REMOVE_TODO:
//       var todos = state.todos.filter((todo) => todo._id !== action.todoId)

//       if (state.loggedInUser) {
//         if (!state.loggedInUser.activities) {
//           state.loggedInUser.activities = []
//         }
//         state.loggedInUser.activities.push(
//           `Removed Todo ${action.todoId} at ${new Date()}`
//         )
//         console.log(state.loggedInUser)
//       }
//       return { ...state, todos }
//     case ADD_TODO:
//       if (state.loggedInUser) {
//         if (!state.loggedInUser.activities) {
//           state.loggedInUser.activities = []
//         }
//         state.loggedInUser.activities.push(
//           `Added Todo ${action.savedTodo._id} at ${new Date(
//             action.savedTodo.updatedAt
//           )}`
//         )
//       }
//       return { ...state, todos: [...state.todos, action.savedTodo] }
//     case UPDATE_TODO:
//       console.log('bla')
//       var todos = state.todos
//       const newTodos = todos.map((todo) => {
//         if (todo._id === action.savedTodo._id) {
//           return action.savedTodo
//         } else return todo
//       })
//       if (state.loggedInUser) {
//         if (!state.loggedInUser.activities) {
//           state.loggedInUser.activities = []
//         }
//         state.loggedInUser.activities.push(
//           `Updated Todo ${action.savedTodo._id} at ${new Date(
//             action.savedTodo.updatedAt
//           )}`
//         )
//       }

//       return { ...state, todos: newTodos }
//     case IS_LOADING_TRUE:
//       return { ...state, isLoading: action.newIsLoading }
//     case IS_LOADING_FALSE:
//       return { ...state, isLoading: action.newIsLoading }
//     case SET_FILTER:
//       return { ...state, filterBy: action.newFilter }
//     case UPDATE_USER:
//       return { ...state, loggedInUser: action.updatedUser }
//     case SET_USER:
//       console.log(action.loggedinUser)
//       return { ...state, loggedInUser: action.loggedinUser }
//     default:
//       return state
//   }
// }

window.gStore = store
