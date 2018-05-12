module.exports = {
  fetchRooms: {
    path: '/api/v001/rooms',
    method: 'GET',
  },

  fetchRoom: {
    path: '/api/v001/rooms/:id',
    method: 'GET',
  },

  addTask: {
    path: '/api/v001/tasks',
    method: 'POST',
  },

  updateTask: {
    path: '/api/v001/tasks/:id',
    method: 'PATCH',
  },

  deleteTask: {
    path: '/api/v001/tasks/:id',
    method: 'DELETE',
  },
};
