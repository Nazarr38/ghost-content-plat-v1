import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { Button } from './Button'

test('renders and triggers click', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  fireEvent.click(screen.getByRole('button', { name: /click me/i }))
  expect(handleClick).toHaveBeenCalled()
})
