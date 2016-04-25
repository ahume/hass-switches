import React from 'react'
import Button from './Button'

const toggleStatus = (old) => old === 'on' ? 'off' : 'on';

const Buttons = ({ buttons, onButtonClick }) => (
  <div>
  	{buttons.map(button => 
  		<Button
  			key={button.id}
  			text={button.text}
  			status={button.status}
  			onClick={() => onButtonClick(button.id, toggleStatus(button.status))}
  		/>
  	)}
  </div>
)

export default Buttons