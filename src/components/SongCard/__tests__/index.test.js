import { fireEvent, render, waitFor } from '@testing-library/react';
import SongCard from '..';
import makeRequest from '../../../utils/makeRequest/makeRequest';

jest.mock('../../../utils/makeRequest/makeRequest');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SongCard', () => {
  it('should render the song card', () => {
    const song = {
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
    };
    makeRequest.mockResolvedValue({
      data: {
        count: 15,
        like: true,
      },
    });
    const { getByText, getByAltText } = render(<SongCard song={song} />);
    const songName = getByText('Lost');
    const songImage = getByAltText('songIcon');
    expect(songName).toBeTruthy();
    expect(songImage.src).toContain('https://i.scdn.co/image/ab67616d0000b27386a8ab515de4b7aef28cd631');
  });

  it('should increment the like count when isLiked is false and like image is clicked', async () => {
    const song = {
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
    };
    makeRequest.mockResolvedValueOnce({
      data: {
        count: 15,
        like: false,
      },
    });
    makeRequest.mockResolvedValueOnce({
      data: {
        count: 15,
        like: true,
      },
    });
    const { getByText, getByAltText } = render(<SongCard song={song} />);
    await waitFor(() => {
      expect(getByText('15')).toBeTruthy();
    });
    const likeIcon = getByAltText('like-icon');
    fireEvent.click(likeIcon);
    expect(getByText('16')).toBeTruthy();
  });

  it('should decrement the like count when isLiked is true and like image is clicked', async () => {
    const song = {
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
    };
    makeRequest.mockResolvedValueOnce({
      data: {
        count: 15,
        like: true,
      },
    });
    makeRequest.mockResolvedValueOnce({
      data: {
        count: 14,
        like: false,
      },
    });
    const { getByText, getByAltText } = render(<SongCard song={song} />);
    await waitFor(() => {
      expect(getByText('15')).toBeTruthy();
    });
    const likeIcon = getByAltText('like-icon');
    fireEvent.click(likeIcon);
    expect(getByText('14')).toBeTruthy();
  });
});
