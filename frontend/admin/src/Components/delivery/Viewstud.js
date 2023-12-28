import React from "react";
import { Link } from "react-router-dom";

export default function Viewstud(){
    return(
        <div className="container mt-5" >
        <Link className="btn btn-primary" to ="/">Home</Link>
            <div className="row mt-5">
                <div className="col-md-6">
                    <ul class="list-group">
                        <li class="list-group-item active" aria-current="true">Supplier Details</li>
                        <li class="list-group-item">Supplier Company: Jayalan</li>
                        <li class="list-group-item">Supplier Address: Jayalan</li>
                        <li class="list-group-item">Supplier Product: SunGlasses</li>
                        <li class="list-group-item">Supplier Mobile:123456</li>
                    </ul>
                </div>
            </div>
        </div>


    )
}