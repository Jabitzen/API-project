import { Link } from 'react-router-dom';

function Spot({ spot }) {
    return (
        <div className="spot-card">
            <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} className="spot-card-image" />
            </Link>
            <p>{spot.name}, {spot.state} ★{spot.avgRating}</p>
            <p>${spot.price} night</p>
        </div>
    )
}

export default Spot
