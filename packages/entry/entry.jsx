const React = require('react');
const PropTypes = require('prop-types');

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  dateParse(ms) {
    const date = new Date(ms);
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  handleClick(e) {
    console.log(e.target);
    this.props.changeCap('ivan');
  }

  render() {
    return (
      <div className='entry'>
        <div className='entry__date entry__elem'>{this.dateParse(this.state.date)}</div>
        <div className='entry__user entry__elem'>{this.state.user}</div>
        <div className='entry__controls entry__elem'>
          <div className='entry__remove'>изм</div>
          <div className='entry__change' onClick={this.handleClick.bind(this)}>уд</div>
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  date: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

module.exports = Entry;
