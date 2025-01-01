import React from 'react';

export default function AddRestaurant() {
    return (

        <div className="mb-3 mt-4">
            <form action="">
                <div className="form-row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input type="text" className="form-control" placeholder="Name" />
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input type="text" className="form-control" placeholder="Location" />
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <select className="form-control">
                            <option disabled>Price Range</option>
                            <option value="1">₹</option>
                            <option value="2">₹₹</option>
                            <option value="3">₹₹₹</option>
                            <option value="4">₹₹₹₹</option>
                            <option value="5">₹₹₹₹₹₹</option>
                        </select>
                    </div>


                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <button type="submit" className="btn btn-primary form-control">Add</button>

                    </div>
                </div>
            </form>
        </div>
    );
}
