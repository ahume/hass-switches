import { receiveChange } from  './actions';

const corsProxyHost = 'http://192.168.0.62:1337';
const hassEndpoint = `${corsProxyHost}/192.168.0.62:8123/api`;

// 
export const stateJsonToStore = json => {
	return json.map(entity => {
		entity.id = entity.entity_id.replace('.', '-');
		entity.status = entity.state;
		return entity;
	});
}

export const updateHass = (name, newState) => {
	return new Promise(resolve => {
		fetch(`${hassEndpoint}/services/homeassistant/turn_${newState}`, {
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
		return fetch(`${hassEndpoint}/states`)
			.then(response => response.json())
			.then(stateJsonToStore)
			.then(json => { 
				return { buttons: json}
			})
			.then(resolve)
			.catch(reject)
	});
}