import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/requests'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    retry: 1
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
}
