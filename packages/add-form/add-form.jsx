const React = require('react');
const TextInput = require('controls/text-input.jsx');
const Checkbox = require('controls/checkbox.jsx');
const PropTypes = require('prop-types');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projector: 0,
      sound: 0,
      telephone: 0,
      capacity: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const newRoom = {
      name: this.state.name,
      capacity: Number(this.state.capacity),
      equipment: {
        projector: this.state.projector,
        sound: this.state.sound,
        telephone: this.state.telephone,
      },
    };
    this.props.addRoom(newRoom);
  }


  render() {
    const placeholders = { name: 'Название', capacity: 'Вместимость' };
    const labels = { projector: 'Проектор', sound: 'Колонки', telephone: 'Телефон' };
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <div className="add-form__tite">Добавить переговорную в БД</div>
        <TextInput name="name"
                   id="textName"
                   placeholder={placeholders.name}
                   handleChange={this.handleChange} />
        <TextInput name="capacity"
                   id="textCapacity"
                   placeholder={placeholders.capacity}
                   handleChange={this.handleChange} />
        <div className="add-form__equipment">Имеющееся оборудование:</div>
        <Checkbox name="projector"
                  id="checkboxProjector"
                  label={labels.projector}
                  handleChange={this.handleChange}/>
        <Checkbox name="sound"
                  id="checkboxSound"
                  label={labels.sound}
                  handleChange={this.handleChange}/>
        <Checkbox name="telephone"
                  id="checkboxTelephone"
                  label={labels.telephone}
                  handleChange={this.handleChange}/>
        <button type="submit" className="button">Добавить</button>
      </form>
    );
  }
}
AddForm.propTypes = { addRoom: PropTypes.func };
module.exports = AddForm;
