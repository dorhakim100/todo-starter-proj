const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

import { setFilterBy } from '../store/todo.actions.js'

export function TodoFilter({ filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const allSortButtonRef = useRef()
  const [allSortButton, setAllSortButton] = useState(allSortButtonRef.current)
  const activeSortButtonRef = useRef()
  const [activeSortButton, setActiveSortButton] = useState(
    activeSortButtonRef.current
  )
  const doneSortButtonRef = useRef()
  const [doneSortButton, setDoneSortButton] = useState(
    doneSortButtonRef.current
  )

  useEffect(() => {
    // Notify parent
    filterBy = filterByToEdit
    setFilterBy(filterBy)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault()
    setFilterBy(filterByToEdit)
  }

  function onSortTodos({ target }) {
    const sortBy = target.id
    const isChecked = target.checked

    console.log(sortBy)
    console.log(isChecked)
    switch (sortBy) {
      case 'all':
        activeSortButtonRef.current.checked = false
        doneSortButtonRef.current.checked = false
        break
      case 'active':
        allSortButtonRef.current.checked = false
        doneSortButtonRef.current.checked = false
        break
      case 'done':
        allSortButtonRef.current.checked = false
        activeSortButtonRef.current.checked = false
        break

      default:
        break
    }

    setFilterByToEdit({ ...filterByToEdit, filterActiveDone: sortBy })
  }

  const { txt, importance } = filterByToEdit
  return (
    <section className='todo-filter'>
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input
          value={txt}
          onChange={handleChange}
          type='search'
          placeholder='By Txt'
          id='txt'
          name='txt'
        />
        <label htmlFor='importance'>Importance: </label>
        <input
          value={importance}
          onChange={handleChange}
          type='number'
          placeholder='By Importance'
          id='importance'
          name='importance'
        />
        <div className='sorting-buttons-container'>
          <div className='sorting-container all'>
            <input
              type='checkbox'
              id='all'
              onChange={onSortTodos}
              ref={allSortButtonRef}
            />
            <label htmlFor='all'>All</label>
          </div>
          <div className='sorting-container active'>
            <input
              type='checkbox'
              id='active'
              onChange={onSortTodos}
              ref={activeSortButtonRef}
            />
            <label htmlFor='active'>Active</label>
          </div>
          <div className='sorting-container done'>
            <input
              type='checkbox'
              id='done'
              onChange={onSortTodos}
              ref={doneSortButtonRef}
            />
            <label htmlFor='done'>Done</label>
          </div>
        </div>

        <button hidden>Set Filter</button>
      </form>
    </section>
  )
}
