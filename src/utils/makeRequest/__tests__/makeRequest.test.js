import axios from 'axios';
import { GET_ALL_SONGS } from '../../../constants/apiEndPoints';
import makeRequest from '../makeRequest';

jest.mock('axios');

describe('makeRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should make an API call when only apiEndPoint is specified and return response body', async () => {
    axios.mockResolvedValue({
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
    const response = await makeRequest(GET_ALL_SONGS);
    expect(response).toEqual([
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
      }]);
  });

  it('should make an API call when apiEndPoint and dynamicConfig are specified and return response body', async () => {
    axios.mockResolvedValue({
      data: {
        count: 14,
        like: false,
      },
    });
    const response = await makeRequest(GET_ALL_SONGS, {
      like: false,
    });
    expect(response).toEqual({
      count: 14,
      like: false,
    });
  });

  it('should navigate to error page when API call fails without error code', async () => {
    const navigate = jest.fn();
    axios.mockRejectedValue({
      response: {},
    });
    await makeRequest(GET_ALL_SONGS, {}, navigate);
    expect(navigate).toHaveBeenCalledWith('/error');
  });

  it('should navigate to error page when API call fails with error code', async () => {
    const navigate = jest.fn();
    axios.mockRejectedValue({
      response: {
        status: 500,
      },
    });
    await makeRequest(GET_ALL_SONGS, {}, navigate);
    expect(navigate).toHaveBeenCalledWith('/error/500');
  });
});
