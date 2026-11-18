import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:3001' })

const getAnecdotes = async () => {
  const response = await client.get('/anecdotes')
  return response.data
}

const createAnecdote = async (content) => {
  const response = await client.post('/anecdotes', { content })
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await client.put(`/anecdotes/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAnecdotes, createAnecdote, updateAnecdote }
