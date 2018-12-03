import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {

	static defaultProps = {
		name: 'This is index page !'
	}
	constructor(props) {
		super(props);
		this.state = {
			date: new Date().toLocaleString()
};
		this.countDown = this.countDown.bind(this);
	}

	componentDidMount() {
		this.countDown();
	}

	countDown() {
		this.timer = setInterval(() => {
			this.setState({
				date: new Date().toLocaleString()
			})
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}


	render() {
		return (
			<div>
				<div>{this.props.name}</div>
				<div>{this.state.date}</div>
			</div>
	);
	}
}

ReactDOM.render(<Index/>, document.querySelector('.container'));

if (module.hot) {
	module.hot.accept();
}