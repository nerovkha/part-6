import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import anecdoteService from './services/anecdotes'
import { useAnecdoteStore, useAnecdotes } from './store'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

const anecdotes = [
  { content: 'Make it work, then make it fast', id: '5', votes: 0 },
  { content: 'Untested code is broken code', id: '3', votes: 3 },
  { content: 'Real artists ship code', id: '1', votes: 7 }
]

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('anecdote store', () => {
  it('state is initialized with the anecdotes returned by the backend', async () => {
    anecdoteService.getAll.mockResolvedValueOnce(anecdotes)

    await useAnecdoteStore.getState().actions.initialize()

    expect(anecdoteService.getAll).toHaveBeenCalledOnce()
    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })

  it('useAnecdotes returns the anecdotes sorted by votes', () => {
    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current.map((a) => a.id)).toEqual(['1', '3', '5'])
  })

  it('useAnecdotes returns a properly filtered list when a filter is set', () => {
    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())

    act(() => {
      useAnecdoteStore.getState().actions.setFilter('code')
    })

    expect(result.current.map((a) => a.id)).toEqual(['1', '3'])
  })

  it('voting increases the vote count of the voted anecdote only', async () => {
    useAnecdoteStore.setState({ anecdotes })
    anecdoteService.update.mockImplementationOnce((id, updated) =>
      Promise.resolve(updated)
    )

    await useAnecdoteStore.getState().actions.vote('3')

    const state = useAnecdoteStore.getState().anecdotes
    expect(state.find((a) => a.id === '3').votes).toBe(4)
    expect(state.find((a) => a.id === '5').votes).toBe(0)
    expect(state.find((a) => a.id === '1').votes).toBe(7)
    expect(anecdoteService.update).toHaveBeenCalledWith('3', {
      content: 'Untested code is broken code',
      id: '3',
      votes: 4
    })
  })
})
