import { useVoteAnecdote } from '../hooks'
import { useNotify } from '../NotificationContext'

const AnecdoteList = ({ anecdotes }) => {
  const voteAnecdote = useVoteAnecdote()
  const notify = useNotify()

  const handleVote = (anecdote) => {
    voteAnecdote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notify(`you voted '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
