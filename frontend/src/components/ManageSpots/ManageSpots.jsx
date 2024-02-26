import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUserSpots } from "../../store/spots"
import Spot from "./Spot"
import './ManageSpots.css'

function ManageSpots() {
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    return (
        <div className="manage-spots-container">
            <h2>Manage Spots</h2>
            <div className="manage-spot-container">
                {!spots.length ? (
                    <button className="manage-spot-btn">
                        <Link to='/spots/new'>Create a New Spot</Link>
                    </button>
                ) : (spots.map(spot => (
                    <Spot
                        spot={spot}
                        key={spot.id}
                    />
                )))}
            </div>
        </div>
    )
}

export default ManageSpots
