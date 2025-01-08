import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantList';
import RestaurantFinder from '../apis/RestaurantFinder';
import Review from '../components/Review';
import AddReview from '../components/AddReview';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectRestaurant, setSelectRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get(`${id}`);
        setSelectRestaurant(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }

    }

    fetchData();

  }, []);


  return (
    <div>
      <div>
        {
          selectRestaurant &&
          <>
          <h1 className='text-center display-1'>{selectRestaurant.restaurant.name}</h1>
            <div className='mt-3'><Review reviews={selectRestaurant.reviews}/></div>
            <div className='mt-3'><AddReview /></div>
          </>
        }
      </div>

    </div>
  )
}
