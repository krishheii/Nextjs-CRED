import React from 'react';
import { Router, Route } from "react-router-dom";
import history from '../history';
import { Layout } from 'antd';

import Heading  from './Heading';
import UserCreate  from './user/UserCreate';
import UserList  from './user/UserList';


const App = () => {
    return (<div >
         
        <Router history={history}>
            <Layout style={{background:'white'}}>
                <Heading />
                <Route exact path="/" component={UserList} />
                <Route  path="/user/usercreate" component={UserCreate} />
            </Layout>
        </Router>

    </div>);
};
export default App;