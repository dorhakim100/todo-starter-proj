import { userService } from '../services/user.service.js'
import { store } from './store.js'
import { SET_USER, UPDATE_USER } from '../reducers/user.reducer.js'
import { storageService } from '../services/async-storage.service.js'

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((loggedinUser) => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function login(credentials) {
  return userService.login(credentials).then((loggedinUser) => {
    store.dispatch({ type: SET_USER, loggedinUser })
    return loggedinUser
  })
}

export function logout() {
  return userService
    .logout()
    .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function checkout(amount) {
  return userService.updateScore(-amount).then((updatedScore) => {
    store.dispatch({ type: CLEAR_CART })
    store.dispatch({ type: SET_USER_SCORE, score: updatedScore })
  })
}

export function updateUser(updatedUser) {
  return userService.updateUserDetails(updatedUser).then((updatedUser) => {
    store.dispatch({ type: UPDATE_USER, updatedUser })
  })
}
