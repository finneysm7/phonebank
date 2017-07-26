import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser } from '../actions/edit_account';

class EditAccountInfo extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    const { id } = this.props.auth;
    this.props.updateUser(id, values, history);
  }

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    const { account_info } = this.props;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={!!field.name && field.name.slice(0, 9) === 'password' ? 'password' : 'text'}
          className="form-control"
          placeholder={account_info[field.name]}
          // placeholder={!!user[field.name] ? user[field.name] : "*******"}
          {...field.input}
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="first_name"
              label="First Name"
              component={this.renderField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="last_name"
              label="Last Name"
              component={this.renderField}
            />
          </div>
        </div>
        <Field
          name="email"
          label="Email"
          component={this.renderField}
        />
        <Field
          name="phone_number"
          label="Phone Number"
          component={this.renderField}
        />
        <button type="submit">Update</button>
      </form>
    );
  }
}

// EditAccountInfo.propTypes = {
//   updateUser: PropTypes.func,
//   handleSubmit: PropTypes.func,
//   auth: PropTypes.obj,
//   id: PropTypes.number,
//   account_info: PropTypes.obj,
//   history: PropTypes.obj
// };

// EditAccountInfo.defaultProps = {
//   updateUser: () => 'meow',
//   handleSubmit: () => 'meow',
//   auth: { id: 1 },
//   id: 1,
//   account_info: {
//     first_name: 'meow',
//     last_name: 'meows',
//     email: 'meow@meow.com',
//     phone_number: '12342345'
//   },
//   history: { meow: 'meow' }
// };


function validate(values) {
  const errors = {};
  const { password, password_confirm } = values;
  if (!!password && !!password_confirm && password !== password_confirm) {
    errors.password_confirm = 'The passwords must match.';
  }
  return errors;
}

function mapStateToProps(state) {
  return { account_info: state.account_info, auth: state.auth };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'EditedAccountInfo'
  })(
    connect(mapStateToProps, { updateUser })(EditAccountInfo)
  )
);
