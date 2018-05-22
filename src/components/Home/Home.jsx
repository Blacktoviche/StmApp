import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Title, Content, Spinner, Button, Icon } from 'native-base';
import { JWT_TOKEN } from '../../utils/Utils';
import Login from '../Login/Login';
import * as Storage from '../../utils/Storage';
import { setupLogginPage, setupUserToken } from '../../actions/HomeActions';
import LatestProjects from '../Project/LatestProjects';
import LatestTasks from '../Task/LatestTasks';
import LatestComments from '../Comment/LatestComments';
import { getMainColor } from '../../utils/Utils';

class Home extends Component {


    componentWillMount() {
        console.log('Home::Token:: ', Storage.getEntry(JWT_TOKEN));
        Storage.saveEntry(JWT_TOKEN, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUyNzE5OTUzNCwiaWF0IjoxNTI2NTk0NzM0fQ.feG-t_WLWSbd5KLC-VKt8UbkmGpYSymV4BCqW9VgrEnqOFFBqCuDLjgHcI45qwhDlXLtH_C2jtIq4b_YqJE7mg');
        if (Storage.getEntry(JWT_TOKEN)) {
            console.log('Home::setuplogintoken');
            this.props.setupUserToken();
        } else {
            this.props.setupLogginPage();
        }
    }

    renderHome() {
        if (this.props.authenticated == null) {
            return (
                <Container>
                    <Content>
                        <Image source={require('../../assets/imgz/logo.png')} style={styles.imageStyle} />
                        <Spinner color='red' />
                    </Content>
                </Container>)
        } else if (!this.props.authenticated) {
            return (<Login />)
        } else {
            let navigation = this.props.navigation;
            console.log('navigation::', navigation);
            return (
                <Container>
                    <Header style={{ backgroundColor: `${getMainColor()}`}}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                    </Header>
                    <Content>
                        <LatestProjects isAdmin={this.props.isAdmin} />
                        <LatestTasks isAdmin={this.props.isAdmin} />
                        <LatestComments isAdmin={this.props.isAdmin} />
                    </Content>
                </Container>
            )
        }
    }
    render() {
        
        
        return (
            this.renderHome()
        )
    }
}

const styles = {
    imageStyle: {
        height: 200,
        width: null,
        flex: 1
    }
};

const mapStateToProps = ({ homeReducer }) => {
    const { username, email, isAdmin, authenticated } = homeReducer;
    return { username, email, isAdmin, authenticated };
};

export default connect(mapStateToProps, {
    setupUserToken, setupLogginPage
})(Home);