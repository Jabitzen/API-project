import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSpot } from "../../store/spots"
import './SpotDetails.css'

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const images = spot?.SpotImages

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch, spotId])


    return (
        <div>
            <h2>{spot?.name}</h2>
            <h4>{spot?.city}, {spot?.state}, {spot?.country}</h4>
            <div className="spot-img-container">
                {images?.map(image => (
                    <img src={image.url} alt={spot?.name} key={image.id} className={`spot-image-${image.id - 1}`}/>
                ))}
            </div>
            <div>
                <h3>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h3>
                <p>{spot?.description}</p>
                <div>
                    <p>${spot?.price} night</p>
                    <p>* {spot?.avgRating}</p>
                    <p>{spot?.numReviews}</p>
                    <button>Reserve</button>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails
