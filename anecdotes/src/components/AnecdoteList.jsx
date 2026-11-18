import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotify } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const notify = useNotify()

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  const handleRemove = async (anecdote) => {
    await remove(anecdote.id)
    notify(`you removed '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 &&
              <button onClick={() => handleRemove(anecdote)}>delete</button>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
