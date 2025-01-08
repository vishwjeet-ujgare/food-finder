import React, { useState, createContext } from "react";

// Create the context
const RestaurantsContext = createContext();

// Define the provider component as a normal function
function RestaurantsContextProvider(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [selectRestaurant, setSelectRestaurant] = useState(null);

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectRestaurant, setSelectRestaurant }}>
            {props.children}
        </RestaurantsContext.Provider>
    );
}

// Export at the end
export { RestaurantsContext, RestaurantsContextProvider };
