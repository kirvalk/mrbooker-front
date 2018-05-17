const React = require('react');

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projector: undefined,
      sound: undefined,
      telephone: undefined,
      capacity: 0,
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
    } else {
      value = Number(target.value);
    }

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form className='filter' onSubmit={this.handleSubmit}>
        <label>
          Проектор
          <input
            type="checkbox"
            name="projector"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Звук
          <input
            type="checkbox"
            name="sound"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Телефон
          <input
            type="checkbox"
            name="telephone"
            onChange={this.handleChange}
          />
        </label>
        <input type="range" min="0" max="80"
          name="capacity"
          onChange={this.handleChange} />
        <button type='submit'>ПРИМЕНИТЬ</button>
      </form>
    );
  }
}

module.exports = Filter;
