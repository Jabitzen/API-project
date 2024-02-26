import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSpot } from "../../store/spots"
import { fetchSpotReviews } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import './SpotDetails.css'
import CreateReview from "../CreateReview"
import Reviews from "../Reviews"

function SpotDetails() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews))
    const images = spot?.SpotImages

    let hasPosted = false
    if(reviews?.find(review => review.userId === sessionUser?.id)) hasPosted = true

    const reserveBtn = e => {
        e.preventDefault()
        alert('Feature coming soon')
    }

    useEffect(() => {
        dispatch(fetchSpot(spotId))
        dispatch(fetchSpotReviews(spotId))
    }, [dispatch, spotId, reviews.length, images])

    return (
        <div className="spot-details-container">
            <div className="spot-header">
                <h2>{spot?.name}</h2>
                <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            </div>
            <div className="spot-img-container">
                {images?.map((image, index) => (
                    <img src={image.url} alt={spot?.name} key={image.id} className={`spot-img-${index}`} />
                ))}
            </div>
            <div className="spot-details">
                <div className="spot-description">
                    <h3>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h3>
                    <p>{spot?.description}</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit itaque quod sequi non cumque incidunt sapiente ullam unde rerum est, asperiores, dolores ut? Non cupiditate sit, est sequi aut ipsam omnis eum minima dolorum saepe! Dolore vitae voluptas eos cupiditate praesentium accusamus fugit illo animi? Doloribus eveniet cumque dolore aliquid harum dignissimos delectus libero repellendus et labore a nam at dolor dolorum quod minus asperiores totam quos nesciunt aperiam, reiciendis laborum. Autem veritatis, aliquam sequi dignissimos fugiat natus, neque assumenda possimus architecto cupiditate rem. Magnam totam, eligendi, non explicabo fugiat sunt asperiores perspiciatis ea dolores accusantium neque quam repellendus sint!</p>
                    <br />
                </div>
                <div className="reserve-container">
                    <div className="reserve-top">
                        <p>${spot?.price} night</p>
                        {spot?.numReviews === 0 ? (
                            <div className="reserve-top-right">
                                <i className="fa-solid fa-star" />
                                <span>New</span>
                            </div>
                        ) : (
                            <div className="reserve-top-right">
                                <i className="fa-solid fa-star" />
                                {Number(spot?.avgStarRating).toFixed(1)}
                                <span> · </span>
                                {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}
                            </div>
                        )}

                    </div>
                    <button className="reserve-btn" onClick={reserveBtn}>
                        Reserve
                    </button>
                </div>
            </div>

            <div className="reviews-header">
                <div>
                    {spot?.numReviews === 0 ? (
                        <div>
                            <i className="fa-solid fa-star" />
                            <span>New</span>
                        </div>
                    ) : (
                        <div>
                            <i className="fa-solid fa-star" />
                            {Number(spot?.avgStarRating).toFixed(1)}
                            <span> · </span>
                            {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}
                        </div>
                    )}
                </div>
                {sessionUser && !hasPosted && (spot?.ownerId !== sessionUser?.id) && (
                    <OpenModalButton
                        buttonText='Post Your Review'
                        modalComponent={<CreateReview spotId={spotId} />}
                    />
                )}
            </div>
            <div className="reviews-container">
                {reviews.length ? (
                    <Reviews/>
                ) : (
                    (sessionUser && (sessionUser.id !== spot?.ownerId)) && (<p>Be the first to post a review!</p>)
                )}
            </div>
        </div>
    )
}

export default SpotDetails
