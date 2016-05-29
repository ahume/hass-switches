import { connect } from 'react-redux';
import { fetchStateChange } from '../actions';
import Buttons from '../components/Buttons';


const mapStateToProps = (state) => {
	return {
		buttons: state.get('buttons')
	}
}

const mapDispatchToProps = (dispatch) => {
  	return {
    	onButtonClick: (id, newState) => {
      		dispatch(fetchStateChange(id, newState))
    	}
  	}
}

const VisibleButtons = connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Buttons);

export default VisibleButtons;