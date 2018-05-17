const React = require('react');
const moment = require('moment');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const Direction = require('controls/direction-button.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const AddRoom = require('icons/add-room');
const Filter = require('filter/filter.jsx');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('ru');

    this.state = { rooms: [], isAdding: false, days: this.getCurrentDates() };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.moveWeek = this.moveWeek.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.filterRooms = this.filterRooms.bind(this);
  }

  getCurrentDates() {
    const firstDay = moment().startOf('week').startOf('day');
    const currentDates = [];
    for (let i = 0; i < 7; i += 1) {
      currentDates.push(moment(firstDay).add(i, 'd').valueOf());
    }
    return currentDates;
  }

  componentDidMount() {
    createRequest('fetchRooms').then((response) => {
      this.setState({ rooms: response.data || [] });
    });
  }

  addRoom(obj) {
    const { rooms } = this.state;

    createRequest('addRoom', {}, obj).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.push(response.data);
        this.setState({ rooms, isAdding: false });
      }
    });
  }

  showAddForm() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  deleteRoom(id) {
    const { rooms } = this.state;
    const indexToDelete = rooms.findIndex((room) => room.id === id);
    createRequest('deleteRoom', { id }).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.splice(indexToDelete, 1);
        this.setState({ rooms });
      }
    });
  }

  updateRoom(id, newParams) {
    const { rooms } = this.state;
    const roomToUpdate = rooms.find((room) => room.id === id);
    createRequest('updateRoom', { id }, newParams).then((response) => {
      if (response.status === responseStatuses.OK) {
        Object.keys(roomToUpdate).forEach((key) => {
          if (!newParams[key]) return;
          if (typeof roomToUpdate[key] === 'object' && roomToUpdate[key] !== null) {
            Object.assign(roomToUpdate[key], newParams[key]);
          } else {
            roomToUpdate[key] = newParams[key];
          }
        });

        this.setState({ rooms });
      }
    });
  }

  filterRooms(queryOptions) {
    createRequest('fetchRooms', queryOptions).then((response) => {
      if (response.status === responseStatuses.OK) {
        this.setState({ rooms: response.data || [] });
      }
    });
  }

  moveWeek(direction) {
    if (direction === 'prev') {
      const days = this.state.days.map((day) => moment(day).subtract(1, 'd').valueOf());
      // const days = this.state.days.map((day) => moment(day).subtract(1, 'd').valueOf());
      this.setState({ days });
    } else if (direction === 'next') {
      const days = this.state.days.map((day) => moment(day).add(1, 'd').valueOf());
      // const days = this.state.days.map((day) => moment(day).add(1, 'd').valueOf());
      this.setState({ days });
    }
  }

  render() {
    return (
      <div>
        <header className='header'>
          MR Booker
          <AddRoom showAddForm={this.showAddForm} />
        </header>
        <div className="controls">
          <Filter filterRooms={this.filterRooms} />
          <Direction moveWeek={this.moveWeek} dir={'prev'} />
          <Direction moveWeek={this.moveWeek} dir={'next'} />
        </div>
          <div className='rooms'>
            {
              this.state.isAdding
              && <AddForm addRoom={this.addRoom} />
            }
            <div className="rooms__item rooms__item-header">
              <div className="rooms__cell">
                <div className="room-t">КОМНАТА</div>
              </div>
              {
                this.state.days.map((day, index) => {
                  return (
                    <div className="rooms__cell" key={index}>
                      <div className="rooms__week-day">
                        {moment(day).format('dddd').toUpperCase()}
                      </div>
                      <div className="rooms__date">
                        {moment(day).format('DD MMMM YY')}
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
            {
              this.state.rooms.length > 0
              && this.state.rooms
                .map((room) => <Room updateRoom={this.updateRoom}
                                     deleteRoom={this.deleteRoom}
                                     days={this.state.days}
                                     info = {room}
                                     key={room.id} />)
            }
            </ReactCSSTransitionGroup>
          </div>
      </div>
    );
  }
}


module.exports = BookEntries;
