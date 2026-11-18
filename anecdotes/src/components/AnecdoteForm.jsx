import { useAnecdoteActions } from '../store'
import { useNotify } from '../notificationStore'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const notify = useNotify()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await create(content)
    notify(`you added '${content}'`)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
