module.exports = {
  fetchRooms: {
    path: '/api/v001/rooms',
    method: 'GET',
  },

  fetchRoom: {
    path: '/api/v001/rooms/:id',
    method: 'GET',
  },

  addRoom: {
    path: '/api/v001/rooms',
    method: 'POST',
  },

  updateRoom: {
    path: '/api/v001/rooms/:id',
    method: 'PATCH',
  },

  deleteRoom: {
    path: '/api/v001/rooms/:id',
    method: 'DELETE',
  },

  bookRoom: {
    path: '/api/v001/rooms/:id/book',
    method: 'PATCH',
  },
};
