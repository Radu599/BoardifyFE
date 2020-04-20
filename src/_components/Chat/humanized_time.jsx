import React, {Component} from 'react';
import { connect } from 'react-redux';

class HumanizedTime extends Component {

  render() {
    if(!this.props.time.now){
      return (<div/>);
    }
    const prefix = this.props.prefix || "";
    const suffix = this.props.suffix || "ago";

    return (
      <span>{prefix} {this.props.time.now} {suffix}</span>
    );
  }

}

export default connect(({time}) => ({time}))(HumanizedTime);
