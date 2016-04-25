const getDefaultState = () => {
	return {
		'light-landing': 'loading',
		'light-hall': 'loading'
	}
}

const rootReducer = (state, action) => {
	console.log('reducer', action.type);
	state = state || getDefaultState();
	state = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'REQUEST_CHANGE':
			state[action.name] = 'loading';
			return state;
		case 'RECEIVE_CHANGE':
			return action.state;
	}
}

export default rootReducer;