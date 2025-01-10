import React, { useContext, useState } from 'react'
import {  useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantList';

export default function AddReview() {

    const [reviewInfo, setReviewInfo] = useState({
        name: "",
        rating: "Rating",
        review: ""

    })

    const { setSelectRestaurant } = useContext(RestaurantsContext);



    const { id } = useParams();
   

    function handleReviewInfo(event) {
        const { name, value } = event.target;

        setReviewInfo((prev) => ({
            ...prev, [name]: value
        }));
    }

    async function handleReviewSumission(e) {
        e.preventDefault();

        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, reviewInfo);
            setSelectRestaurant((prev) => ({
                ...prev,
                restaurant:response.data.data.restaurant ,
                reviews: [...prev.reviews, response.data.data.review]
            }));

            // console.log("Server Reponse : ", response)
        } catch (error) {
            console.log("Error : ", error)
        }

        // navigate(0);

        clearReviewForm();
    }

    function clearReviewForm() {
        setReviewInfo(() => {
            return (
                {
                    name: "",
                    rating: "Rating",
                    review: ""
                }
            );
        })
    }

    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor='name'>Name</label>
                        <input name='name' onChange={handleReviewInfo} value={reviewInfo.name} id="name" placeholder='name' type="text" className="form-control" />
                    </div>

                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select name='rating' onChange={handleReviewInfo} value={reviewInfo.rating} id="rating" className='custom-select'>
                            <option value="disabled">Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea name="review" onChange={handleReviewInfo} value={reviewInfo.review} id="Review" className='form-control' ></textarea>
                </div>

                <button type='submit' onClick={handleReviewSumission} className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}
