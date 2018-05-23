const React = require('react');
const moment = require('moment');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const DirectionButton = require('controls/direction-button.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const AddRoom = require('icons/add-room');
const Filter = require('filter/filter.jsx');
const Logo = require('icons/logo.jsx');
const PropTypes = require('prop-types');

class BookEntries extends React.Component {
  static getCurrentDates() {
    const firstDay = moment().startOf('week').startOf('day');
    const currentDates = [];
    for (let i = 0; i < 7; i += 1) {
      currentDates.push(moment(firstDay).add(i, 'd').valueOf());
    }
    return currentDates;
  }

  static getDayClasses(day) {
    const today = moment().startOf('day').valueOf();
    return day === today ? 'rooms__cell rooms__today' : 'rooms__cell';
  }

  static getMaxCapacity(rooms) {
    const maxCapacity = rooms.reduce((prevMax, room) => {
      return room.capacity > prevMax ? room.capacity : prevMax;
    }, 0);
    return maxCapacity;
  }

  constructor(props) {
    super(props);
    moment.locale('ru');

    this.state = {
      rooms: [],
      isAdding: false,
      days: BookEntries.getCurrentDates(),
      maxCapacity: 0,
    };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.moveWeek = this.moveWeek.bind(this);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.filterRooms = this.filterRooms.bind(this);
    this.goToCurrentWeek = this.goToCurrentWeek.bind(this);
  }

  componentDidMount() {
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);
    createRequest('fetchRooms').then((response) => {
      const rooms = response.data;
      this.setState({ rooms: rooms || [], maxCapacity: BookEntries.getMaxCapacity(rooms) });
      changeLoadingStatus(false);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { rooms } = this.state;
    const prevMaxCapacity = prevState.maxCapacity;
    const newMaxCapacity = BookEntries.getMaxCapacity(rooms);
    if (prevMaxCapacity === newMaxCapacity) return;
    this.setState({ maxCapacity: newMaxCapacity });
  }

  goToCurrentWeek() {
    this.setState({ days: BookEntries.getCurrentDates() });
  }


  addRoom(roomParams) {
    const { rooms } = this.state;
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);

    createRequest('addRoom', {}, roomParams).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.push(response.data);
        this.setState({ rooms, isAdding: false });
        changeLoadingStatus(false);
      }
    });
  }

  toggleAddForm() {
    const { isAdding } = this.state;
    this.setState({ isAdding: !isAdding });
  }

  deleteRoom(id) {
    const { rooms } = this.state;
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);

    const indexToDelete = rooms.findIndex((room) => room.id === id);
    createRequest('deleteRoom', { id }).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.splice(indexToDelete, 1);
        this.setState({ rooms });
      }
      changeLoadingStatus(false);
    });
  }

  updateRoom(id, newParams) {
    const { rooms } = this.state;
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);

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
      changeLoadingStatus(false);
    });
  }

  filterRooms(queryOptions) {
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);

    createRequest('fetchRooms', queryOptions).then((response) => {
      if (response.status === responseStatuses.OK) {
        this.setState({ rooms: response.data || [] });
      }
      changeLoadingStatus(false);
    });
  }

  moveWeek(ev) {
    const { days } = this.state;
    const { direction } = ev.target.dataset;
    const { step } = ev.target.dataset;
    if (direction === 'prev') {
      const newDays = days.map((day) => moment(day).subtract(1, step).valueOf());
      this.setState({ days: newDays });
    } else if (direction === 'next') {
      const newDays = days.map((day) => moment(day).add(1, step).valueOf());
      this.setState({ days: newDays });
    }
  }


  render() {
    const { isAdding, maxCapacity, days, rooms } = this.state;
    const { changeLoadingStatus } = this.props;
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="addform-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {
            isAdding && <AddForm addRoom={this.addRoom} />
          }
        </ReactCSSTransitionGroup>
        <header className="header">
          <a href="/" className="logo">
            <Logo />
            <span className="logo__text">MR Booker</span>
          </a>
          <AddRoom toggleAddForm={this.toggleAddForm} />
        </header>
        <div className="controls">
          <Filter filterRooms={this.filterRooms} maxCapacity={maxCapacity} />
        </div>
        <div className="calendar-controls">
          <DirectionButton moveWeek={this.moveWeek} dir="prev" step="week" />
          <DirectionButton moveWeek={this.moveWeek} dir="prev" step="day" />
          <DirectionButton moveWeek={this.moveWeek} dir="next" step="day" />
          <DirectionButton moveWeek={this.moveWeek} dir="next" step="week" />
          <button type="button" onClick={this.goToCurrentWeek}>
            ТЕК НЕДЕЛЯ
          </button>
          <div className="today">
            Сегодня {moment().format('DD MMMM YYYY')}, {moment().format('dddd')}
          </div>
        </div>
        <div className="rooms">
          <div className="rooms__item rooms__item-header">
            <div className="rooms__cell" />
            {
              days.map((day, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className={BookEntries.getDayClasses(day)} key={index}>
                  <div className="rooms__week-day">
                    {moment(day).format('dddd').toUpperCase()}
                  </div>
                  <div className="rooms__date">
                    {moment(day).format('DD MMMM YY')}
                  </div>
                </div>
              ))
              }
          </div>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {
              rooms.length > 0 && rooms.map((room) => (
                <Room
                  updateRoom={this.updateRoom}
                  deleteRoom={this.deleteRoom}
                  changeLoadingStatus={changeLoadingStatus}
                  days={days}
                  info={room}
                  key={room.id}
                />
              ))
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

BookEntries.propTypes = { changeLoadingStatus: PropTypes.func.isRequired };
module.exports = BookEntries;
