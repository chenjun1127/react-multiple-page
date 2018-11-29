import React from 'react';
import ReactDOM from 'react-dom';

class Second extends React.Component {
	render() {
		return (
			<div>This is seconde page</div>
		)
	}
}

ReactDOM.render(<Second/>, document.querySelector('.container'));