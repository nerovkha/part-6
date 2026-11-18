import { useAnecdoteActions } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  return (
    <div>
      filter{' '}
      <input data-testid="filter" onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

export default Filter
