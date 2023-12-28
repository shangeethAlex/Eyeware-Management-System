import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, post, put } from './request';
import withRouteUtil from './withRouteUtil';
import AdminDashBoard from '../Employee/AdminDashBoard';

const Input = ({ name, label, onChange, value, error }) => {
    return (
        <div className="mb-3">
            <label htmlFor={`${name} ${label}`} className="form-label">
                {label}
            </label>

            <input
                type="text"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id={`${name} ${label}`}
                name={name}
                onChange={(event) => onChange(event.target.value)}
                value={value}
            />

            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

class AddSupplier extends Component {
    state = {
        createRequest: {},
        id: '',
        errors: {},
    };

    async componentDidMount() {
        const params = this.props.params;
        const id = params.id;

        if (id) {
            this.setState({ id });

            const createRequest = await get(`supplier/${id}`);

            this.setState({ createRequest });
        }
    }

    handleInput(name, value) {
        const createRequest = { ...this.state.createRequest };
        const errors = { ...this.state.errors };

        // Validation
        switch (name) {
            case 'phone':
                if (!/^\d{10}$/.test(value)) {
                    errors[name] = 'Phone number should have 10 digits.';
                } else {
                    delete errors[name];
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    errors[name] = 'Invalid email syntax.';
                } else {
                    delete errors[name];
                }
                break;
            case 'category':
                // You can add specific validation for the category if needed
                delete errors[name];
                break;
            default:
                // For other fields, clear the error
                delete errors[name];
                break;
        }

        createRequest[name] = value;
        this.setState({ createRequest, errors });
    }

    async addSupplier() {
        const { createRequest, errors } = this.state;

        // Check for validation errors before adding supplier
        if (Object.keys(errors).length === 0) {
            const supplier = await post('supplier', createRequest);

            this.props.navigate('/adhome');
        }
    }

    async updateSupplier() {
        const { createRequest, errors } = this.state;

        // Check for validation errors before updating supplier
        if (Object.keys(errors).length === 0) {
            const supplier = await put('supplier', createRequest);

            this.props.navigate('/list');
        }
    }

    render() {
        const { id, createRequest = {}, errors } = this.state;

        return (
            <div>
                <AdminDashBoard></AdminDashBoard>
                <div className="container-fluid mt-5">
                    <div className="mx-auto w-50 shadow p-5">
                        <h3 className="mt-5">Fill the Details</h3>

                        <Input
                            name="name"
                            label="Supplier Name"
                            value={createRequest['name']}
                            onChange={(value) => this.handleInput('name', value)}
                            error={errors['name']}
                        />

                        <Input
                            name="company"
                            label="Supplier Company"
                            value={createRequest['company']}
                            onChange={(value) => this.handleInput('company', value)}
                            error={errors['company']}
                        />

                        <Input
                            name="phone"
                            label="Phone Number"
                            value={createRequest['phone']}
                            onChange={(value) => this.handleInput('phone', value)}
                            error={errors['phone']}
                        />

                        <Input
                            name="email"
                            label="Email"
                            value={createRequest['email']}
                            onChange={(value) => this.handleInput('email', value)}
                            error={errors['email']}
                        />

                        <Input
                            name="address"
                            label="Address"
                            value={createRequest['address']}
                            onChange={(value) => this.handleInput('address', value)}
                            error={errors['address']}
                        />

                        <div onChange={(event) => this.handleInput('category', event.target.value)}>
                            <label className="form-label">Product Category</label> <br />

                            <input
                                type="radio"
                                value="Glasses"
                                name="gender"
                                checked={createRequest.category === 'Glasses'}
                            />{' '}
                            Glasses
                            <br />

                            <input
                                type="radio"
                                value="Sun Glasses"
                                name="gender"
                                checked={createRequest.category === 'Sun Glasses'}
                            />{' '}
                            Sun Glasses
                            <br />

                            <input
                                type="radio"
                                value="Lens"
                                name="gender"
                                checked={createRequest.category === 'Lens'}
                            />{' '}
                            Lens
                            <br />
                        </div>

                        {id && (
                            <button className="mt-3 btn btn-primary" onClick={this.updateSupplier.bind(this)}>
                                Update
                            </button>
                        )}

                        {!id && (
                            <button className="mt-3 btn btn-primary" onClick={this.addSupplier.bind(this)}>
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouteUtil(AddSupplier);
