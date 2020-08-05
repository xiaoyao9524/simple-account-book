import React, {Component} from 'react';

interface IMyComponentProps {
  a: number;
  b: number;
}

interface IMyComponentState {
  a: number;
  b: number;
}

class MyComponent extends Component<IMyComponentProps, IMyComponentState> {
  constructor (props: IMyComponentProps) {
    super(props);
    const {a, b} = props;
    this.state = {
      a,
      b
    }
  }

  test () {
    console.log(this.state);
  }

  render () {
    return (
      <div>MyComponent</div>
    )
  }
}

export default MyComponent;
