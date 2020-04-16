import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/reset.css';
import '../assets/css/main.scss';
import MenuBar from '../components/MenuBar';
class Index extends React.Component {
  static defaultProps = {
    name: 'This is index page !',
  };
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
    };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  countDown() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date().toLocaleString(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <>
        <MenuBar name="index"></MenuBar>
        <div className="container">
          <div>{this.props.name}</div>
          <div>{this.state.date}</div>
          <img src={require('../assets/images/16220103.jpg')} />
        </div>
      </>
    );
  }
}

ReactDOM.render(<Index />, document.querySelector('.app'));

if (module.hot) {
  module.hot.accept();
}
