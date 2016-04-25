const initialState = {
	buttons: [
		{
			id: 'light-landing',
			text: 'Landing',
			status: 'loading'
		},
		{
			id: 'light-hall',
			text: 'Hall',
			status: 'loading'
		}
	]
};

const requiredEntities = ['light-landing', 'light-hall'];

export const buttons = (state = [], action) => {
	state = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'REQUEST_CHANGE':
			return state.map(button => {
				if (button.id === action.id) {
					button.status = 'loading';
				}
				return button;
			})
			break;
		case 'RECEIVE_CHANGE':
			return state
				.map(button => {
					button.status = action.state.buttons
						.find((b => b.id === button.id)).state;
					return button;
				});
			break;

	}
	return state;
}

export const switchesApp = (state = initialState, action) => {
	return {
		buttons: buttons(state.buttons, action)
	};
}