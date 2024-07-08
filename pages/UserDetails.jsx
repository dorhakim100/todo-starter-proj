const { useSelector, useDispatch } = ReactRedux

// import {}

export function UserDetails() {
  const user = useSelector((state) => state.loggedInUser)
  console.log(user)

  return (
    <section>
      <h2>{`${user.fullname}`}</h2>
      <div className='profile-adjust-container'>
        <label htmlFor='name'>Name:</label>
        <input id='name' type='text' />
        <label htmlFor='color'>Color:</label>
        <input id='color' type='color' />
        <label htmlFor='bgcolor'>Background Color:</label>
        <input id='bgcolor' type='color' />
      </div>
    </section>
  )
}
