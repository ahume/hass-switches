import { updateHass, getStateFromHass } from './hass-api';

export const fetchStateChange = (id, newState) => {
	console.log('fetchStateChange')
	return dispatch => {
		dispatch(requestStateChange(id, 'loading'));
	    return updateHass(id, newState)
	    	.then(() => {
	    		dispatch(requestState())
	    	});
	};
}

export const requestState = () => {
	console.log('requestState')
	return dispatch => {
		return getStateFromHass()
    		.then(state => {
    			dispatch(receiveStateChange(state))
    		});
	}
}

export const requestStateChange = (id, newState) => {
	console.log('requestStateChange')
	return {
		type: 'REQUEST_CHANGE',
		id,
		state: newState
	};
}

export const receiveStateChange = newState => {
	console.log('receiveStateChange', newState);
	return {
		type: 'RECEIVE_CHANGE',
		success: true,
		state: newState
	};
}