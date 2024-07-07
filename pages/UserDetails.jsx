const { useSelector, useDispatch } = ReactRedux

// import {}

export function UserDetails() {
  const user = useSelector((state) => state.loggedInUser)
  console.log(user)

  return (
    <section>
      <h2>{`${user.fullname}`}</h2>
    </section>
  )
}
