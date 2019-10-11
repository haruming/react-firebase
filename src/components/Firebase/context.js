import React from 'react';
const FirebaseContext = React.createContext(null);

// accept a React component with props
// inherit the original props and add firebase prop
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
export default FirebaseContext;