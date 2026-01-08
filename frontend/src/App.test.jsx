import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('renders MERN Stack title', () => {
  render(<App />)
  const title = screen.getByText(/MERN Stack/i)
  expect(title).toBeInTheDocument()
})