import React from 'react';
import { Route } from 'react-router';

const RouteWithParams = (props) => {
  const propsNew = { ...props };
  delete propsNew.children;

  return (
    <Route
      {...propsNew}
      render={(routeProps) => {
        const childrenEl = React.Children.map(props.children, (child) => {
          return React.isValidElement(child) 
            ? React.cloneElement(child, { ...child.props, ...routeProps.match.params })
            : child
        });

        return childrenEl;
      }} />
  );
};

export default RouteWithParams;