import { csrfFetch } from "./csrf"

// Action Type Constants
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const REMOVE_SPOT = 'spots/REMOVE_SPOT'


// Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot
})

export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})



export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

export const fetchSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spot = await response.json()
        dispatch(receiveSpot(spot))
        return spot
    }
}


export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current')

  if(response.ok) {
    const currentSpots = await response.json()
    dispatch(loadSpots(currentSpots))
    return currentSpots
  }
}

export const addImages = (spotId, images) => async () => {
  const imagesArr = []
  for(let i = 0; i < images.length; i++) {
    const body = {url: images[i]}
    if(i === 0) body.preview = true
    else body.preview = false
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if(response.ok) {
      const image = response.json()
      imagesArr.push(image)
    }
  }
  return imagesArr
}

export const createSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })

    if(response.ok) {
      const spot = await response.json()
      dispatch(receiveSpot(spot))
      return spot
    }
    else {
      const error = await response.json()
      return error
    }
}

export const updateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })

    if(response.ok) {
      const spot = await response.json()
      console.log("UPDATE", spot)
      dispatch(editSpot(spot))
      return spot
    }
    else {
      const error = await response.json()
      return error
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })

    if(response.ok) {
      dispatch(removeSpot(spotId))
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
        case RECEIVE_SPOT:{
            return { ...state, [action.spot.id]: action.spot }
        }
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case REMOVE_SPOT: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer
