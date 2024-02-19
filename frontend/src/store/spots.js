import { csrfFetch } from "./csrf"

// Action Type Constants
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'

// Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})


export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const spotsState = {};
            action.spots.Spots.forEach((spot) => {
              spotsState[spot.id] = spot;
            });
            return spotsState;
          }
        default:
            return state
    }
}

export default spotsReducer
