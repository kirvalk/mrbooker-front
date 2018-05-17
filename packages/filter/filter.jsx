const React = require('react');
const moment = require('moment');

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projector: undefined,
      sound: undefined,
      telephone: undefined,
      capacity: 0,
      reserved: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const queryOptions = {};
    Object.keys(this.state).reduce((acc, val) => {
      if (this.state[val] !== undefined) {
        Object.assign(queryOptions, { [val]: this.state[val] });
      }
      return queryOptions;
    }, queryOptions);

    this.props.filterRooms(queryOptions);
  }

  handleChange(ev) {
    const { target } = ev;
    const { name } = target;
    let value;
    if (target.type === 'checkbox') {
      value = Number(target.checked) || undefined;
    } else if (target.type === 'date') {
      value = moment(target.value).startOf('day').valueOf() || undefined;
    } else {
      value = Number(target.value);
    }

    this.setState({ [name]: value });
  }

  date(ev) {
    console.log(moment().startOf('day').valueOf());
    console.log(moment(1526490000000));
  }

  render() {
    return (
      <form className='filter' onSubmit={this.handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="projector"
            onChange={this.handleChange}
            />
            Проектор
        </label>
        <label>
          <input
            type="checkbox"
            name="sound"
            onChange={this.handleChange}
            />
        </label>
            Звук
        <label>
          <input
            type="checkbox"
            name="telephone"
            onChange={this.handleChange}
            />
            Телефон
        </label>
        <input type="range" min="0" max="80"
          className="filter__capacity"
          name="capacity"
          defaultValue="0"
          onChange={this.handleChange} />
        <div className="filter__capacity_val">
          {this.state.capacity}
        </div>
        <input type="date"
          className='filter__date'
          name="reserved"
          onChange={this.handleChange}
        />
        <button type='submit'>ПРИМЕНИТЬ</button>
      </form>
    );
  }
}

module.exports = Filter;
