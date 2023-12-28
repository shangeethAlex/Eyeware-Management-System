import React from 'react'
import { Link } from 'react-router-dom'
import { get } from './request'
import withRouteUtil from './withRouteUtil'

class ViewSupplier extends React.Component {
    state = {
        supplier: {}
    }

    async componentDidMount() {
        const params = this.props.params

        const supplier = await get(`supplier/${params.id}`)

        this.setState({ supplier })
    }

    render() {
        const { supplier } = this.state

        return (
            <div className="container mt-5">
                <Link className="btn btn-primary" to="/list">Home</Link>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item active" aria-current="true">Supplier Details</li>
                            <li className="list-group-item">Supplier Name: {supplier.name}</li>
                            <li className="list-group-item">Supplier Company: {supplier.company}</li>
                            <li className="list-group-item">Supplier Address: {supplier.address}</li>
                            <li className="list-group-item">Supplier Product: {supplier.category}</li>
                            <li className="list-group-item">Supplier Mobile: {supplier.phone}</li>
                            <li className="list-group-item">Supplier Email: {supplier.email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouteUtil(ViewSupplier)