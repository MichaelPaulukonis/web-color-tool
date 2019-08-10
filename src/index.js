import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { validHsl, validRgb, validHex } from 'helpers';
import colorConvert from 'colorConvert';

const Root = () => {
  return (
    // <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <App initialColorHsl={null} />} />
        <Route
          path="/hsl/:h/:s/:l"
          render={({ match }) => {
            const { h, s, l } = match.params;
            return validHsl(h, s, l) ? <App initialColorHsl={[h, s, l]} /> : <Redirect to="/" />;
          }}
        />
        <Route
          path="/rgb/:r/:g/:b"
          render={({ match }) => {
            const { r, g, b } = match.params;
            return validRgb(r, g, b) ? (
              <App initialColorHsl={colorConvert.rgb.toHsl([r, g, b])} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/hex/:hex"
          render={({ match }) => {
            const { hex } = match.params;
            return validHex(hex) ? (
              <App initialColorHsl={colorConvert.hex.toHsl(hex)} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
    // </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
