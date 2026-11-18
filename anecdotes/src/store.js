import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create(devtools((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id)
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1
      })
      set((state) => ({
        anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a))
      }))
    },
    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id)
      }))
    },
    setFilter: (value) => set(() => ({ filter: value }))
  }
})))

export { useAnecdoteStore }

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
