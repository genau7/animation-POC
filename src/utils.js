import React from "react";
import { Route } from "react-router-dom";

export const animateSwitch = (SwitchComponent, AnimationComponent) => ({
  updateStep,
  children
}) => (
  <Route
    render={({ location }) => (
      <AnimationComponent uniqKey={location.pathname} updateStep={updateStep}>
        <SwitchComponent location={location}>{children}</SwitchComponent>
      </AnimationComponent>
    )}
  />
);
