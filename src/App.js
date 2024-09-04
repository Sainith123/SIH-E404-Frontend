import React from "react";
import Index from "pages/index";
import Work from "pages/work";
import Loginsignup from "pages/loginsignup";
import Page404 from "pages/page404";
import VaultPage from "pages/VaultPage"
import ManageAssetsPage from 'pages/ManageAssets';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

export default () => (
    <Router>
        <GlobalStyles />
        <Switch>
            {/* <Route exact path='/index' component={Index}/> */}
        	<Route exact path='/' component={Index}/>
            <Route exact path="/vault" component={VaultPage} />
			<Route exact path='/work' component={Work}/>
			<Route exact path='/loginsignup' component={Loginsignup}/>
            <Route path="/manage-assets" component={ManageAssetsPage} /> 
			<Route component={Page404}/>
        </Switch>
    </Router>
);
