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

  updateTask: {
    path: '/api/v001/tasks/:id',
    method: 'PATCH',
  },

  deleteRoom: {
    path: '/api/v001/rooms/:id',
    method: 'DELETE',
  },
};
