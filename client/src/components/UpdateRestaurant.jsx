import React, { useEffect, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRestaurant() {

    //React Form State
    const [updatedRestaurantInfor, setUpdatedRestaurantInfor] = useState({
        name: "",
        location: "",
        price_range: "Select price range"
    })

    const { id } = useParams();
    let navigate = useNavigate();

    function handleUpdatedRestaurantInfor(event) {
        const { name, value } = event.target;

        setUpdatedRestaurantInfor((prev) => ({
            ...prev,
            [name]: value
        }

        ))
        // console.log("Name : ", name, " Value : ", value);
    }


    //Load data when component load
    useEffect(() => {

        async function fetchData() {
            const response = await RestaurantFinder.get(`/${id}`);
            setUpdatedRestaurantInfor(() => (response.data.data.restaurant))
            // console.log(response);
        }
        fetchData();

    }, []);



    async function handleUpdateFormSubmission(event) {
        event.preventDefault();
        const response = await RestaurantFinder.put(`/${id}`, updatedRestaurantInfor);
        //    console.log(response);
        navigate('/');

    };

    return (
        <div className="container mt-4">

            <h2 style={{ textTransform: 'uppercase' }} className='text-center'>{updatedRestaurantInfor.name}</h2>
            <p className="text-center mb-2">Update Restaurant Information</p>
            <form onSubmit={handleUpdateFormSubmission}>
                {/* Name Field */}
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter restaurant name"
                            onChange={handleUpdatedRestaurantInfor}
                            value={updatedRestaurantInfor.name}
                            required
                        />
                    </div>
                </div>

                {/* Location Field */}
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            className="form-control"
                            placeholder="Enter location"
                            onChange={handleUpdatedRestaurantInfor}
                            value={updatedRestaurantInfor.location}
                            required
                        />
                    </div>
                </div>

                {/* Price Range Field */}
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="priceRange" className="form-label">Price Range</label>
                        <select
                            id="priceRange"
                            name="price_range"
                            className="form-control"
                            onChange={handleUpdatedRestaurantInfor}
                            value={updatedRestaurantInfor.price_range}
                            required
                        >
                            <option value="Select price range" disabled    >Select price range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-4">
                    <div className="col-10  mx-auto">
                        <button type="submit" className="btn btn-success w-100">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateRestaurant;
