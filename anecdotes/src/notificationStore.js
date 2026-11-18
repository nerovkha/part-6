import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create((set) => ({
  message: '',
  notify: (message) => {
    clearTimeout(timeoutId)
    set({ message })
    timeoutId = setTimeout(() => set({ message: '' }), 5 * 1000)
  }
}))

export const useNotificationMessage = () =>
  useNotificationStore((state) => state.message)

export const useNotify = () => useNotificationStore((state) => state.notify)
