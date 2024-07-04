const { useState, useRef, useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos } from '../store/todo.actions.js'

export function AppHeader() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  const navigate = useNavigate()
  const [user, setUser] = useState(userService.getLoggedinUser())

  const [width, setWidth] = useState(0)
  //   const [height, setHeight] = useState(0);
  let pixelRatio
  const ref = useRef(null)
  const canvasRef = useRef(null)

  const [percentage, setPercentage] = useState('Loading...')

  // responsive width and height
  useEffect(() => {
    loadTodos({ txt: '', importance: 0, filterActiveDone: '' }).then((data) => {
      const todos = data.todos
      const doneTodos = todos.filter((todo) => todo.isDone)
      setPercentage((doneTodos.length * 100) / todos.length)
      const barWidth = ref.current.clientWidth - 50
      canvasRef.current.style.width =
        (barWidth * doneTodos.length) / todos.length + 'px'
      setWidth((barWidth * doneTodos.length) / todos.length)
    })
  }, [todos])

  const displayWidth = Math.floor(pixelRatio * width)

  function onLogout() {
    userService
      .logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')
  }

  return (
    <header className='app-header full main-layout' ref={ref}>
      <section className='header-container'>
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/todo'>Todos</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </nav>
      </section>
      <div className='progress-bar'>
        <div>
          <canvas
            ref={canvasRef}
            height={50}
            width={`${width}px`}
            className={percentage < 70 ? 'progress bad' : 'progress good'}
          ></canvas>
          <span>{`${percentage}%`}</span>
        </div>
      </div>
      <UserMsg />
    </header>
  )
}
