const React = require('react');
const PropTypes = require('prop-types');
const CapIcon = require('icons/capacity');

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
      <div>
        {
          !this.state.changeCap
          && <div className='room__cap' onClick={this.startEditCap.bind(this)}>
              <div className="room__cap-number">
                {this.props.capacity}
              </div>
              <CapIcon />
            </div>
        }
        {
          this.state.changeCap
          && <input type="text" onBlur={this.endEditCap.bind(this)} className='room__input-cap' ref={(input) => { this.capInput = input; }}/>
        }
        {
          !this.state.changeName
            && <div className='room__name' onClick={this.startEdit.bind(this)}>
            {this.props.name}
          </div>
        }
        {
          this.state.changeName
          && <input type="text" onBlur={this.endEdit.bind(this)} className='room__input-name' ref={(input) => { this.nameInput = input; }}/>
        }

      </div>
    );
  }
}


module.exports = RoomName;
