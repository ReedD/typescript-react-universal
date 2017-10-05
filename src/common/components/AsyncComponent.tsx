import * as React from 'react';

interface IAsyncComponentState {
  Component?: any;
}

export default function asyncComponent(
  chunkName: string,
  getComponent: Promise<any>
) {
  return class AsyncComponent extends React.Component<
    any,
    IAsyncComponentState
  > {
    static Component: any = null;

    static loadComponent() {
      return getComponent.then(c => c.default).then(Component => {
        AsyncComponent.Component = Component;
        return Component;
      });
    }

    mounted = false;

    constructor(props: any) {
      super(props);
      const { Component } = AsyncComponent;
      this.state = {
        Component,
      };
      if (props && props.staticContext && props.staticContext.splitPoints) {
        props.staticContext.splitPoints.push(chunkName);
      }
    }

    componentWillMount() {
      if (this.state.Component === null) {
        AsyncComponent.loadComponent().then(Component => {
          if (this.mounted) {
            this.setState({ Component });
          }
        });
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Component } = this.state;
      if (Component !== null) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
