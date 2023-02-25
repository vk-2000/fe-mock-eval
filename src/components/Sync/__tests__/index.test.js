import { fireEvent, render } from '@testing-library/react';
import Sync from '..';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Sync', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const { getByText } = render(<Sync />);
    expect(getByText(':((')).toBeInTheDocument();
  });
  it('should navigate to main page when sync button is clicked', () => {
    const { getByTestId } = render(<Sync />);
    const syncButton = getByTestId('btn-sync');
    fireEvent.click(syncButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
