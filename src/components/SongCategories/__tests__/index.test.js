import { fireEvent, render, waitFor } from '@testing-library/react';
import SongCategories from '..';
import makeRequest from '../../../utils/makeRequest/makeRequest';

jest.mock('../../../utils/makeRequest/makeRequest');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SongCategories', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should show loading message', async () => {
    makeRequest.mockResolvedValue({
      data: [
        {
          id: 'cd3cc1e3-e1e0-4ccd-bc67-747648985838',
          name: 'Lost',
          imageUrl: 'https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631',
          artist: {
            id: '496b0a85-2bfa-45bc-8d0f-57fe0ce55708',
            name: 'Maroon 5',
          },
          genre: {
            id: '128aa7f8-c943-48ce-b352-7edd26fa4c6e',
            name: 'Pop',
          },
        }],
    });
    const { getByText } = render(<SongCategories />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('should render correctly', async () => {
    makeRequest.mockResolvedValue({
      data: [
        {
          id: 'cd3cc1e3-e1e0-4ccd-bc67-747648985838',
          name: 'Lost',
          imageUrl: 'https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631',
          artist: {
            id: '496b0a85-2bfa-45bc-8d0f-57fe0ce55708',
            name: 'Maroon 5',
          },
          genre: {
            id: '128aa7f8-c943-48ce-b352-7edd26fa4c6e',
            name: 'Pop',
          },
        }],
    });
    const { getByText } = render(<SongCategories />);
    await waitFor(() => {
      expect(getByText('Genres')).toBeInTheDocument();
    });
  });

  it('should navigate to no records page when no records are found', async () => {
    makeRequest.mockResolvedValue({
      data: [],
    });
    render(<SongCategories />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/no-records');
    });
  });

  it('should navigate to main page when grid button is clicked', async () => {
    makeRequest.mockResolvedValue({
      data: [
        {
          id: 'cd3cc1e3-e1e0-4ccd-bc67-747648985838',
          name: 'Lost',
          imageUrl: 'https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631',
          artist: {
            id: '496b0a85-2bfa-45bc-8d0f-57fe0ce55708',
            name: 'Maroon 5',
          },
          genre: {
            id: '128aa7f8-c943-48ce-b352-7edd26fa4c6e',
            name: 'Pop',
          },
        }],
    });
    const { getByTestId } = render(<SongCategories />);
    await waitFor(() => {
      expect(getByTestId('btn-grid')).toBeTruthy();
    });
    const btnGrid = getByTestId('btn-grid');
    fireEvent.click(btnGrid);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
