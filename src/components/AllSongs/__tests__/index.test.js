import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import AllSongs from '..';
import makeRequest from '../../../utils/makeRequest/makeRequest';

jest.mock('../../../utils/makeRequest/makeRequest');

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

describe('AllSongs', () => {
  it('should show a loading message', async () => {
    makeRequest.mockResolvedValue({ data: [{
        "id": "cd3cc1e3-e1e0-4ccd-bc67-747648985838",
        "name": "Lost",
        "imageUrl": "https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631",
        "artist": {
            "id": "496b0a85-2bfa-45bc-8d0f-57fe0ce55708",
            "name": "Maroon 5"
        },
        "genre": {
            "id": "128aa7f8-c943-48ce-b352-7edd26fa4c6e",
            "name": "Pop"
        }
    },] });
    const { getByText } = render(<AllSongs />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Lost')).toBeTruthy();
    });
  });
  it('should render card for each song', async () => {
    makeRequest.mockResolvedValue({ data: [{
        "id": "cd3cc1e3-e1e0-4ccd-bc67-747648985838",
        "name": "Lost",
        "imageUrl": "https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631",
        "artist": {
            "id": "496b0a85-2bfa-45bc-8d0f-57fe0ce55708",
            "name": "Maroon 5"
        },
        "genre": {
            "id": "128aa7f8-c943-48ce-b352-7edd26fa4c6e",
            "name": "Pop"
        }
    },] });
    render(<AllSongs />);
    await waitFor(() => {
      expect(screen.queryAllByTestId("song-card").length).toEqual(1);
    });
  });
  it('should navigate to no records page when no records are found', async () => {
    makeRequest.mockResolvedValue({ data: [] });
    render(<AllSongs />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/no-records');
    });
  });
  it('should navigate to categories when genre button is pressed', async () => {
    makeRequest.mockResolvedValue({ data: [] });
    render(<AllSongs />);
    await waitFor(() => {
      expect(screen.getByTestId('btn-genre')).toBeTruthy();
    })
    const genreButton = screen.getByTestId('btn-genre');
    fireEvent.click(genreButton);
    expect(mockNavigate).toHaveBeenCalledWith('/categories');
  })
});
