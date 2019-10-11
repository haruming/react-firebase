import React, { Component } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

// return a function that turn JSX to a React Component
const withAuthentication = JSXComponent => {
    // create a React componnet class and wrap the paramter component
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                (authUser) => {
                    authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <JSXComponent { ...this.props } />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};
export default withAuthentication