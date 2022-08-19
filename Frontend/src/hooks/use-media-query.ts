/**
 * Given a screen size query string, ex: '(min-width: 1024px)'
 * @returns true if the screen size matches the query string
 * @returns false if the screen size does not match the query string
 */

import { useState, useEffect } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

export default useMediaQuery
