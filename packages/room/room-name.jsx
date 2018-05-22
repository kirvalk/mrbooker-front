const React = require('react');
const PropTypes = require('prop-types');
const CapIcon = require('icons/capacity');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class RoomName extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props, { changeName: false, changeCap: false });

    this.startEditName = this.startEditName.bind(this);
    this.endEditName = this.endEditName.bind(this);
    this.startEditCap = this.startEditCap.bind(this);
    this.endEditCap = this.endEditCap.bind(this);
  }

  startEditName() {
    this.setState({ changeName: true });
  }

  startEditCap() {
    this.setState({ changeCap: true });
  }

  endEditName(ev) {
    const { updateRoom } = this.props;
    if (ev.type === 'blur' || (ev.type === 'keydown' && ev.keyCode === 13)) {
      const { id } = this.props;
      const name = this.nameInput.value;
      if (name === '' || name === this.nameInput.defaultValue) {
        this.setState({ changeName: false });
      } else {
        const newParams = { name };
        updateRoom(id, newParams);
        this.setState({ changeName: false });
      }
    }
  }

  endEditCap(ev) {
    const { updateRoom } = this.props;
    if (ev.type === 'blur' || (ev.type === 'keydown' && ev.keyCode === 13)) {
      const { id } = this.props;
      const capacity = Number(this.capInput.value);
      if (capacity < 2 || capacity === Number(this.capInput.defaultValue)) {
        this.setState({ changeCap: false });
      } else {
        const newParams = { capacity };
        updateRoom(id, newParams);
        this.setState({ changeCap: false });
      }
    }
  }

  render() {
    const { changeCap, changeName } = this.state;
    const { capacity, name } = this.props;
    return (
      <div className="room__info">
        <ReactCSSTransitionGroup
          transitionName="left-slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            !changeCap && (
            <div className="room__cap" onClick={this.startEditCap}>
              <div className="room__cap-number">
                {capacity}
              </div>
              <CapIcon />
            </div>
            )
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="right-slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >

          {
            changeCap && (
            <input
              autoFocus
              type="text"
              onBlur={this.endEditCap}
              onKeyDown={this.endEditCap}
              className="room__input-cap"
              ref={(el) => { this.capInput = el; }}
              defaultValue={capacity}
            />
            )
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="left-slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            !changeName && (
              <div className="room__name" onClick={this.startEditName}>
                {name}
              </div>
            )
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="right-slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            changeName && (
            <input
              autoFocus
              type="text"
              onBlur={this.endEditName}
              onKeyDown={this.endEditName}
              className="room__input-name"
              ref={(el) => { this.nameInput = el; }}
              defaultValue={name}
            />
            )
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

RoomName.propTypes = {
  id: PropTypes.string.isRequired,
  updateRoom: PropTypes.func.isRequired,
  capacity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
module.exports = RoomName;
