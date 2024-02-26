import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteReview } from "../../store/reviews"
import './DeleteReview.css'

function DeleteReview({ review }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleClick = async e => {
        e.preventDefault()
        dispatch(deleteReview(review.id))
        closeModal()
    }

    return (
        <div className="delete-review-container">
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={handleClick} className="delete-review-button">Yes (Delete Review)</button>
            <button onClick={closeModal} className="dont-delete-review-button">No (Keep Review)</button>
        </div>
    )
}

export default DeleteReview
