import expect from 'expect';
import { stateJsonToStore } from './../src/hass-api';

const response = [
	{
		entity_id: 'light.landing',
		state: 'on'
	},
	{
		entity_id: 'light.hall',
		state: 'off'
	}
];

describe('stateJsonToStore', () => {
	it('changes state property to status', () => {
		let store = stateJsonToStore(response);
		expect(store[0].status).toBe('on');
		expect(store[1].status).toBe('off');
	});

	it('changes entity_id property to id, and replaces . -> -', () => {
		let store = stateJsonToStore(response);
		expect(store[0].id).toBe('light-landing');
		expect(store[1].id).toBe('light-hall');
	})
})