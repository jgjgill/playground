import { useEffect, useState } from 'react'

interface StorageProps {
  initialValue?: string
  key: string
  storage: 'local' | 'session'
}

const useStorage = ({ initialValue = '', key, storage = 'local' }: StorageProps) => {
  const area = storage === 'local' ? window.localStorage : window.sessionStorage

  const [storedValue, setStoredValue] = useState(initialValue)

  const setValue = <T>(value: T) => {
    try {
      area.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(err, `storage error ${key}`)
    }
  }

  useEffect(() => {
    try {
      const value = area.getItem(key)
      setStoredValue(value ? JSON.parse(value) : initialValue)
    } catch (err) {
      setStoredValue(initialValue)
    }
  }, [area, key, initialValue])

  return { storedValue, setValue }
}

export const useSessionStorage = ({
  initialValue,
  key,
}: Omit<StorageProps, 'storage'>) => {
  return useStorage({ initialValue, key, storage: 'session' })
}

export const useLocalStorage = ({ initialValue, key }: Omit<StorageProps, 'storage'>) => {
  return useStorage({ initialValue, key, storage: 'local' })
}
