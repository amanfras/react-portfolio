import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const NavigationContainer = (props) =>{

    const dynamicLink = (route, linkTest) => {
        return (                
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName="nav-link-active">{linkTest}</NavLink>
            </div> 
        )
    };

    const handleSignedOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch( error => {
            console.log("Error signing out", error);
        });
    }

    return (
        <div className="nav-wrapper">
            <div className="left-side">
                <div className="nav-link-wrapper">
                    <NavLink exact to='/' activeClassName="nav-link-active"> Home </NavLink>
                </div>
                <div className="nav-link-wrapper">
                    <NavLink to='/about-me' activeClassName="nav-link-active"> About </NavLink>
                </div>
                <div className="nav-link-wrapper">
                    <NavLink to='/contact' activeClassName="nav-link-active"> Contact </NavLink>
                </div>
                <div className="nav-link-wrapper">
                    <NavLink to='/blog' activeClassName="nav-link-active"> Blog </NavLink>
                </div>
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null }
            </div>

            <div className="right-side">
                Adela Mansanet Frasquet
                {props.loggedInStatus === 'LOGGED_IN' ? <a onClick={handleSignedOut}>
                    <FontAwesomeIcon icon="sign-out-alt" />
                </a> : null}
            </div>
        </div>
    );
};

export default withRouter(NavigationContainer);