import { useCreateAnecdote } from '../hooks'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const createAnecdote = useCreateAnecdote()
  const notify = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const form = event.target
    const content = form.anecdote.value

    createAnecdote.mutate(content, {
      onSuccess: () => {
        notify(`anecdote '${content}' created`)
        form.reset()
      },
      onError: (error) => {
        notify(error.response.data.error)
      }
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
