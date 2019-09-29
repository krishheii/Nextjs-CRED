import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class Heading extends Component {
    render() {

        return (<div>
            <Header style={{backgroundColor:'black'}}>
                <Row>
                    <Col span={12}><Link to="/" style={user}> Users </Link></Col>
                </Row>
            </Header>
        </div>);
    }
}


const user = {
    color: 'white',
    fontSize: '30px'
}

export default Heading;