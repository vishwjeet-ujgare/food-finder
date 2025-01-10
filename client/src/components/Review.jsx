import React from 'react'
import StartRating from './StartRating';

function Review({ reviews }) {
    return (
        <div className='row row-cols-3 mb-2'>

            {
                reviews.map((review) => {
                    return (<div key={review.id} className="card  text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>

                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span>
                                <StartRating rating={review.rating} key={review.id} />
                            </span>
                        </div>

                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>

                    );
                })

            }

        </div>

    )
}

export default Review;