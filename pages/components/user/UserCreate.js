import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../../actions';
import {
    Form,
    Input,
} from 'antd';


class UserCreate extends Component {

    onSubmit = formValues => {
        this.props.dispatch(createUser(formValues));
    };

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div style={{ color: '#f5222d' }}>{error}</div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <div style={{ marginBottom: '1%' }}>
                <label>{label}</label>
                <Input {...input}  autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    render() {
        return (<div>
            <Form style={{ margin: '2%' }} onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <Field name="name" component={this.renderInput} label="Enter Name" />
                <Field name="email" component={this.renderInput} label="Enter Email" />
                <button style={submitButton}>Submit</button>
            </Form>
        </div>);
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
        errors.name = 'You must enter a name';
    }

    if (!formValues.email) {
        errors.email = 'You must enter a email';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
      }
    return errors;
};

const submitButton = {
    background: 'black',
    color: 'white',
    padding: '.5% 1%',
    border: '0px'
}


const formWrapped = reduxForm({
    form: 'userCreate',
    validate
})(UserCreate);
export default connect(null, { createUser })(formWrapped);