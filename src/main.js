import { fetchStateChange, requestStateChange, receiveStateChange } from './actions';
import { getStateFromHass } from  './hass-api';
import rootReducer from './reducers';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  render(store.getState());
});

const init = () => {
	document.querySelector('.container')
		.addEventListener('click', onClick);

	initStatePoller();
	fetchAndUpdateState();
}

const initStatePoller = () => {
	setInterval(fetchAndUpdateState, 5000);
}

const fetchAndUpdateState = () => {
	return getStateFromHass()
		.then(state => store.dispatch(receiveStateChange(state)))
		.catch(err => {
			console.log('error', err);
		});
}

const onClick = e => {
	e.preventDefault();
	if (e.target.className === 'loading') {
		return;
	}
	var name = e.target.getAttribute('data-name');
	var newState = store.getState()[name] === 'on' ? 'off' : 'on';
	store.dispatch(
		fetchStateChange(name, newState)
	);
}

const render = state => {
	console.log('render', state['light-landing'], state['light-hall']);
	document.querySelector('[data-name=light-landing]').className = state['light-landing'];
	document.querySelector('[data-name=light-hall]').className = state['light-hall'];
}

init();