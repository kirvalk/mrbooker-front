const React = require('react');
const PropTypes = require('prop-types');

class RoomName extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props, { change: false });
  }

  startEdit() {
    this.setState({ change: true });
  }

  endEdit() {
    this.setState({ change: false });
  }


  render() {
    return (
      <div>
        {
           !this.state.change
           && <div className='room__name' onClick={this.startEdit.bind(this)}>
           {this.props.name}
         </div>
        }

        {
          this.state.change
          && <input type="text" onBlur={this.endEdit.bind(this)} className='room__input'/>
        }

      </div>
    );
  }
}


module.exports = RoomName;
