import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantList';

export default function AddRestaurant() {

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: "",
        location: "",
        priceRange: "Price Range"
    })

    const { addRestaurants } = useContext(RestaurantsContext);

    function handleRestaurantInfo(event) {

        const targetElmName = event.target.name;
        const targetElmValue = event.target.value;

        setRestaurantInfo((prev) => ({
            ...prev,
            [targetElmName]: targetElmValue
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                ...restaurantInfo, "price_range": restaurantInfo.priceRange
            })

            addRestaurants(response.data.data.restaurant);
            console.log(response);
        } catch (error) {
            console.error("Error submitting restaurant info:", error);
        }
    }

    return (

        <div className="mb-3 mt-4">
            <form action="submit" onSubmit={handleSubmit} >
                <div className="form-row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input value={restaurantInfo.name} onChange={handleRestaurantInfo} name="name" type="text" className="form-control" placeholder="Name" required />
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <input value={restaurantInfo.location} onChange={handleRestaurantInfo} name='location' type="text" className="form-control" placeholder="Location" required />
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                        <select value={restaurantInfo.priceRange} onChange={handleRestaurantInfo} name='priceRange' className="form-control" required>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
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
