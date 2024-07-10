const { useSelector, useDispatch } = ReactRedux
const { useRef, useState, useEffect } = React

import { updateUser } from '../store/user.actions.js'
import { storageService } from '../services/async-storage.service.js'

export function UserDetails() {
  const user = useSelector((state) => state.loggedInUser)
  console.log(user)

  const [userData, setUserData] = useState([])
  const [activities, setActivities] = useState([])
  // console.log(userData)

  const nameInputRef = useRef()
  const colorInputRef = useRef()
  const backgroundColorInputRef = useRef()

  useEffect(() => {
    storageService.get('userDB', user._id).then((data) => {
      setUserData(data)
      setActivities(data.activities)
    })
  }, [userData])

  function onChangeUserSettings() {
    console.log(user)
    const newPref = {
      _id: user._id,
      fullname: nameInputRef.current.value,
      color: colorInputRef.current.value,
      backgroundColor: backgroundColorInputRef.current.value,
      activities: user.activities || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
    console.log(newPref)
    updateUser(newPref).then((data) => {
      console.log(data)
    })
  }

  return (
    <section
      style={
        user && {
          color: `${user.color}`,
          backgroundColor: `${user.backgroundColor}`,
        }
      }
    >
      <h2>{`${userData.fullname}`}</h2>
      <form className='profile-adjust-container'>
        <label htmlFor='name'>Name:</label>
        <input ref={nameInputRef} id='name' type='text' value={user.fullname} />
        <label htmlFor='color'>Color:</label>
        <input ref={colorInputRef} id='color' type='color' />
        <label htmlFor='bgcolor'>Background Color:</label>
        <input
          ref={backgroundColorInputRef}
          id='bgcolor'
          type='color'
          value={'#ffffff'}
        />
        <button onClick={onChangeUserSettings}>Submit</button>
      </form>

      <div className='activities-container'>
        <h3>Activities</h3>
        <ul>
          {/* {console.log(userData.activities)} */}
          {activities.map((activity) => {
            return <li key={activity}>{activity}</li>
          })}
        </ul>
      </div>
    </section>
  )
}
