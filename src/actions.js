import { updateHass, getStateFromHass } from './hass-api';

export const fetchStateChange = (id, newState) => {
	return dispatch => {
		dispatch(requestStateChange(id, 'loading'));
	    return updateHass(id, newState)
	    	.then(() => {
	    		dispatch(requestState())
	    	});
	};
}

export const requestState = () => {
	return dispatch => {
		return getStateFromHass()
    		.then(state => {
    			dispatch(receiveStateChange(state))
    		});
	}
}

export const requestStateChange = (id, newState) => {
	return {
		type: 'REQUEST_CHANGE',
		id,
		state: newState
	};
}

export const receiveStateChange = newState => {
	return {
		type: 'RECEIVE_CHANGE',
		success: true,
		state: newState
	};
}