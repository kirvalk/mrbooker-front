const React = require('react');
const PropTypes = require('prop-types');
const CapIcon = require('icons/capacity');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class RoomName extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props, { changeName: false, changeCap: false });
  }

  startEdit() {
    this.setState({ changeName: true });
  }

  startEditCap() {
    this.setState({ changeCap: true });
  }

  endEdit() {
    const { id } = this.props;
    const name = this.nameInput.value;
    if (name === '') {
      this.setState({ changeName: false });
    } else {
      const newParams = { name };
      this.props.updateRoom(id, newParams);
      this.setState({ changeName: false });
    }
  }

  endEditCap() {
    const { id } = this.props;
    const capacity = Number(this.capInput.value);
    if (capacity < 2) {
      this.setState({ changeCap: false });
    } else {
      const newParams = { capacity };
      this.props.updateRoom(id, newParams);
      this.setState({ changeCap: false });
    }
  }


  render() {
    return (
      <div className="room__info">
        <ReactCSSTransitionGroup
              transitionName="left-slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
        {
          !this.state.changeCap
          && <div className='room__cap' onClick={this.startEditCap.bind(this)}>
              <div className="room__cap-number">
                {this.props.capacity}
              </div>
              <CapIcon />
            </div>
        }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
              transitionName="right-slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>

        {
          this.state.changeCap
          && <input autoFocus type="text" onBlur={this.endEditCap.bind(this)} className='room__input-cap' ref={(input) => { this.capInput = input; }}/>
        }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
              transitionName="left-slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
        {
          !this.state.changeName
            && <div className='room__name' onClick={this.startEdit.bind(this)}>
            {this.props.name}
          </div>
        }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
              transitionName="right-slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
        {
          this.state.changeName
          && <input autoFocus type="text" onBlur={this.endEdit.bind(this)} className='room__input-name' ref={(input) => { this.nameInput = input; }}/>
        }
        </ReactCSSTransitionGroup>


      </div>
    );
  }
}


module.exports = RoomName;
