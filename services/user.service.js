import { storageService } from './async-storage.service.js'

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  updateUserDetails,
}
export const STORAGE_KEY_LOGGEDIN = 'user'
export const STORAGE_KEY = 'userDB'

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
  })
}

function signup({ username, password, fullname }) {
  const user = { username, password, fullname }
  user.createdAt = user.updatedAt = Date.now()

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
  return user
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'muki',
    password: 'muki1',
  }
}

function updateUserDetails(user) {
  console.log(user)
  return storageService.get(STORAGE_KEY, user._id).then((prevUser) => {
    const { _id, username, password } = prevUser
    console.log(prevUser)

    const userToSave = {
      username,
      password,
      _id: prevUser._id,
      fullname: user.fullname,
      color: user.color || 'black',
      backgroundColor: user.backgroundColor || 'white',
      activities: user.activities || [],
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    storageService.put(STORAGE_KEY, userToSave)

    return Promise.resolve(userToSave)
  })
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
