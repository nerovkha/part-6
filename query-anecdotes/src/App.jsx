import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks'

const App = () => {
  const result = useAnecdotes()

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={result.data} />
    </div>
  )
}

export default App
