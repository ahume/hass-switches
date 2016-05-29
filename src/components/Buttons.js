import React from 'react'
import Button from './Button'

const toggleStatus = (old) => old === 'on' ? 'off' : 'on';

const Buttons = ({ buttons, onButtonClick }) => (
  <div>
  	{buttons.map(button => 
  		<Button
  			key={button.get('id')}
  			text={button.get('text')}
  			status={button.get('status')}
  			onClick={() => onButtonClick(button.get('id'), toggleStatus(button.get('status')))}
  		/>
  	)}
  </div>
);

export default Buttons;