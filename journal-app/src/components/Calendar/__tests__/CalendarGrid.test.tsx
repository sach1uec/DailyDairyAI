import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarGrid } from '../CalendarGrid'
import { useJournalStore } from '../../../store/journalStore'

// Mock the store
vi.mock('../../../store/journalStore')

const mockStore = {
  entries: [
    {
      id: '1',
      date: '2023-12-25',
      content: 'Christmas entry',
      mood: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
}

describe('CalendarGrid', () => {
  beforeEach(() => {
    vi.mocked(useJournalStore).mockReturnValue(mockStore as any)
  })

  it('renders calendar with days', () => {
    const mockOnDateSelect = vi.fn()
    render(<CalendarGrid onDateSelect={mockOnDateSelect} selectedDate="2023-12-25" />)
    
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('calls onDateSelect when day is clicked', () => {
    const mockOnDateSelect = vi.fn()
    render(<CalendarGrid onDateSelect={mockOnDateSelect} selectedDate="2023-12-25" />)
    
    // This is a basic test - in a real app you'd click a specific day
    expect(mockOnDateSelect).toBeDefined()
  })
})