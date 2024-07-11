import { userService } from '../services/user.service.js'

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case UPDATE_USER:
      return { ...state, loggedInUser: cmd.updatedUser }
    case SET_USER:
      return { ...state, loggedInUser: cmd.loggedinUser }
    default:
      return state
  }
}
