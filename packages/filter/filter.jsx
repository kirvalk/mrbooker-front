const React = require('react');
const moment = require('moment');
const PropTypes = require('prop-types');

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

  render() {
    return (
      <form className='filter' onSubmit={this.handleSubmit}>
        <div className="filter__description">
          Выберите неообходимое оборудование и вместимость,
          а так же дату, на которую вы хотите забронировать комнату
        </div>
        <label className="filter__elem">
          <input
            type="checkbox"
            name="projector"
            onChange={this.handleChange}
            />
            Проектор
        </label>
        <label className="filter__elem">
          <input
            type="checkbox"
            name="sound"
            onChange={this.handleChange}
            />
            Звук
        </label>
        <label className="filter__elem">
          <input
            type="checkbox"
            name="telephone"
            onChange={this.handleChange}
            />
            Телефон
        </label>
        <div className="filter__elem filter__elem_range">
          <input type="range"
            min="0"
            max={this.props.maxCapacity}
            className="filter__capacity"
            name="capacity"
            defaultValue="0"
            onChange={this.handleChange} />
          <div className="filter__capacity_val">
            {`Вместимость, мин: ${this.state.capacity}`}
          </div>
        </div>
        <input type="date"
          className='filter__date filter__elem'
          name="reserved"
          onChange={this.handleChange}
        />
        <button type='submit' className="filter__elem">ПРИМЕНИТЬ</button>
      </form>
    );
  }
}
Filter.propTypes = {
  maxCapacity: PropTypes.number.isRequired,
  filterRooms: PropTypes.func.isRequired,
};
module.exports = Filter;
