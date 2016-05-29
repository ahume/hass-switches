import { receiveChange } from  './actions';
import config from '../switch-config';

let hassEndpoint = 'http://' + config.hassHostname;
if (config.corsProxyHost) {
	hassEndpoint = 'http://' + config.corsProxyHost + '/' + config.hassHostname;
}

export const stateJsonToStore = json => {
	return json.map(entity => {
		entity.id = entity.entity_id.replace('.', '-');
		entity.status = entity.state;
		delete entity.state;
		return entity;
	});
}

export const updateHass = (name, newState) => {
	return new Promise(resolve => {
		fetch(`${hassEndpoint}/api/services/homeassistant/turn_${newState}`, {
			method: 'POST',
			body: JSON.stringify({
				entity_id: name.replace('-', '.')
			})
		})
			.then(response => response.json())
			.then(resolve);
	});
}

export const getStateFromHass = () => {
	return new Promise((resolve, reject) => {
		return fetch(`${hassEndpoint}/api/states`)
			.then(response => response.json())
			.then(stateJsonToStore)
			.then(json => {
				return { buttons: json}
			})
			.then(resolve)
			.catch(reject)
	});
}