import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createTimer, removeTimer} from '../../_actions/time';

class TimeTicker extends Component {

  componentDidMount(){
    this.props.createTimer();
  }

  componentWillUnmount(){
    this.props.removeTimer(this.props.interval);
  }

  render(){
    return false;
  }
}

export default connect(({time:{interval}}) => ({interval}),{  createTimer, removeTimer })(TimeTicker);
