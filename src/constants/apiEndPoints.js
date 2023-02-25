export const BACKEND_URL = 'http://localhost:8080/api/';

export const GET_ALL_SONGS = {
  url: 'records',
  method: 'get',
};

export const GET_SONG_LIKES = (id) => ({
  url: `records/${id}/likes`,
  method: 'get',
});

export const UPDATE_LIKES = (id) => ({
  url: `records/${id}/likes`,
  method: 'patch',
});
