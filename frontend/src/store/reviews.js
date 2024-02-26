import { csrfFetch } from "./csrf"

export const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
export const POST_REVIEW = '/reviews/POST_REVIEW'
export const ERASE_REVIEW = '/reviews/ERASE_REVIEW'

export const getSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

export const postReview = (review) => ({
    type: POST_REVIEW,
    review
})

export const eraseReview = (review) => ({
    type: ERASE_REVIEW,
    review
})


export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(getSpotReviews(reviews))
        return reviews
    }
}

export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const newReview = response.json()
        dispatch(postReview(review))
        return newReview
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(eraseReview(reviewId))
    }
}

const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_SPOT_REVIEWS: {
            const reviewsState = {}
            action.reviews.Reviews.forEach((review) => {
                reviewsState[review.id] = review
            })
            return reviewsState
        }
        case POST_REVIEW:
            return { ...state, [action.review.id]: action.review }
        default:
            return state
    }
}

export default reviewsReducer
