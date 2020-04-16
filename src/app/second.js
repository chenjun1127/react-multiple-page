import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/reset.css';
import '../assets/css/main.scss';
import MenuBar from '../components/MenuBar';
class Second extends React.Component {
  render() {
    return (
      <>
        <MenuBar name="second"></MenuBar>
        <div className="container">This is seconde page</div>
      </>
    );
  }
}

ReactDOM.render(<Second />, document.querySelector('.app'));
