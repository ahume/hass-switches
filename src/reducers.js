/*
 * The store gets changed in only two ways.
 *
 * 1) REQUEST_CHANGE action is triggered when the user clicks
 *    a button. The request is made to hass and the action passes
 *    the id of the clicked button so we can set its status
 *    to loading.
 *
 * 2) RECEIVE_CHANGE action is triggered when we receive new
 *    data from hass. Because the response contains the full
 *    state of the app, we simply clobber each buttons status
 *    with the new status.
 */

import Immutable from 'immutable';
import config from '../switch-config';

const initialState = Immutable.fromJS({
	buttons: Immutable.fromJS(config)
		.get('buttons').map(button => {
			return button.set('status', 'loading');
		})
});

export const buttons = (buttons, action) => {
	switch (action.type) {
		case 'REQUEST_CHANGE':
			return buttons.map(button => {
				return button.set('status',
					button.get('id') === action.id ? 'loading' : button.get('status'));
			});
		case 'RECEIVE_CHANGE':
			return buttons.map(button => {
				return button.set('status', action.state.buttons
					.find(b => b.id === button.get('id')).status);
			});
	}
	return buttons;
}

export const switchesApp = (state = initialState, action) => {
	return Immutable.fromJS({
		buttons: buttons(state.get('buttons'), action)
	});
}