import { updateHass, getStateFromHass } from './hass-api';

export const fetchStateChange = (name, newState) => {
	return function (dispatch) {
		dispatch(requestStateChange(name, 'loading'));
	    return updateHass(name, newState)
	    	.then(getStateFromHass)
	    	.then(state => dispatch(receiveStateChange(state)));
	};
}

export const requestStateChange = (name, newState) => {
	return {
		type: 'REQUEST_CHANGE',
		name,
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