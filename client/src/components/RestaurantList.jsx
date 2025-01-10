import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantList';
import StartRating from './StartRating';

export default function RestaurantList() {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);

    let navigate = useNavigate();


    //Only run for first time 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
            } catch (error) {

            }
        }
        fetchData();
    }, [setRestaurants]);


    async function handleDelete(event, id) {
        event.stopPropagation();

        try {
            const response = await RestaurantFinder.delete(`/${id}`);

            if (response.data.status === "success") {
                setRestaurants(() => {
                    return restaurants.filter((restaurant) => restaurant.id !== id)
                })

                // console.log(response)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log("Error while deleting restaurant of id " + id + " ", error);
        }
    }

    function handleUpdate(event, id) {
        event.stopPropagation();
        navigate(`/restaurants/${id}/update`)
    }


    function handleRestaurantSelect(id) {
        navigate(`/restaurants/${id}`);
    }

    function renderRating(restaurant) {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        return (
            <>
                <StartRating rating={restaurant.average_rating} />

                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>

                <tbody>

                    {restaurants && restaurants.length > 0 ? (restaurants.map((restaurant) => {
                        return (<tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(event) => handleUpdate(event, restaurant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(event) => handleDelete(event, restaurant.id)} className='btn btn-danger'>Delete</button></td>
                        </tr>
                        )
                    })

                    ) : (<tr >
                        <td colSpan="6" className="text-center">
                            No data is found! Pleass add a restaurant.
                        </td>
                    </tr>
                    )}


                </tbody>
            </table>
        </div >
    )
}
