import React, { Component } from 'react';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    console.log('Mounted!!');
    this.setState({ visible: true });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default MainLayout;
