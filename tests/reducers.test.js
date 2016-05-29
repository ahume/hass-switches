import expect from 'expect';
import Immutable from 'immutable';
import { buttons } from './../src/reducers';

const initialState = Immutable.fromJS({
	buttons: [
		{
			id: 'light-landing',
			text: 'Landing',
			status: 'off'
		},
		{
			id: 'light-hall',
			text: 'Hall',
			status: 'off'
		}
	]
});

const receivedState = {
	buttons: [
		{
			id: 'light-landing',
			text: 'Landing',
			status: 'on'
		},
		{
			id: 'light-hall',
			text: 'Hall',
			status: 'on'
		}
	]
}

describe('buttons reducer', () => {
  it('sets status to loading when REQUEST_CHANGE action received', () => {
    var b = buttons(initialState.get('buttons'), {
    	type: 'REQUEST_CHANGE',
    	id: 'light-landing'
    });
    expect(b.get(0).get('status')).toBe('loading');
  });

  it('sets store state to match RECEIVED_CHANGE data', () => {
  	var b = buttons(initialState.get('buttons'), {
  		type: 'RECEIVE_CHANGE',
  		state: receivedState
  	});
  	expect(b.get(0).get('status')).toBe('on');
  	expect(b.get(1).get('status')).toBe('on');
  });
});