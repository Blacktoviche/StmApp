import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image } from "react-native";
import {
    Button, Text, Container, List, ListItem, Content, Icon, Separator, Left, Body, Right
} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import { getGradientColor, getMainColor, getSubMainColor, getDrawerLogoBG } from '../../utils/Utils'

const routes = ["Home", "MyProjects", "MyTasks", "MyComments", "Profile",
    "Projects", "Tasks", "Comments", "Users"];

class Sidebar extends Component {

    navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigate);
    }

    renderAdminList() {
        if (this.props.isAdmin) {
            return (
                <List>
                    <ListItem icon button onPress={() => this.props.navigation.navigate(routes[5])}>
                        <Left>
                            <Icon type="FontAwesome" name="building" style={{ color: 'white' }} />
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Projects</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon button onPress={() => this.props.navigation.navigate(routes[6])}>
                        <Left>
                            <Icon type="FontAwesome" name="tasks" style={{ color: 'white' }} />
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Tasks</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon button onPress={() => this.props.navigation.navigate(routes[7])}>
                        <Left>
                            <Icon type="FontAwesome" name="comments" style={{ color: 'white' }} />
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Comments</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon button onPress={() => this.props.navigation.navigate(routes[8])}>
                        <Left>
                            <Icon type="FontAwesome" name="users" style={{ color: 'white' }} />
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Users</Text>
                        </Body>
                    </ListItem>
                </List>
            );
        }
    }

    renderSeparator() {
        if (this.props.isAdmin) {
            return (
                <Separator style={{ backgroundColor: `${getSubMainColor()}` }}>
                    <Icon type="FontAwesome" name="dashboard" style={{ color: 'white' }} >
                        <Text style={{ color: 'white' }}>   Administration</Text>
                    </Icon>
                </Separator>
            );
        }
    }

    render() {

        return (
            <Container>
                <Content style={{ backgroundColor: `${getMainColor()}` }}>
                    <Image
                        source={require('../../assets/imgz/logo.png')}
                        style={{
                            height: 120,
                            width: "100%",
                            alignSelf: "stretch",
                            position: "absolute",
                            backgroundColor: `${getDrawerLogoBG()}`
                        }}
                    />
                    <List style={{ marginTop: 120 }}>
                        <ListItem icon button onPress={() => this.props.navigation.navigate(routes[0])}>
                            <Left>
                                <Icon type="FontAwesome" name="home" style={{ color: 'white' }} />
                            </Left>
                            <Body>
                                <Text style={{ color: 'white' }}>Home</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon button onPress={() => this.props.navigation.navigate(routes[1])}>
                            <Left>
                                <Icon type="FontAwesome" name="building" style={{ color: 'white' }} />
                            </Left>
                            <Body>
                                <Text style={{ color: 'white' }}>My Projects</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon button onPress={() => this.props.navigation.navigate(routes[2])}>
                            <Left>
                                <Icon type="FontAwesome" name="tasks" style={{ color: 'white' }} />
                            </Left>
                            <Body>
                                <Text style={{ color: 'white' }}>My Tasks</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon button onPress={() => this.props.navigation.navigate(routes[3])}>
                            <Left>
                                <Icon type="FontAwesome" name="comments" style={{ color: 'white' }} />
                            </Left>
                            <Body>
                                <Text style={{ color: 'white' }}>My Comments</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon button onPress={() => this.props.navigation.navigate(routes[4])}>
                            <Left>
                                <Icon type="FontAwesome" name="user" style={{ color: 'white' }} />
                            </Left>
                            <Body>
                                <Text style={{ color: 'white' }}>Profile</Text>
                            </Body>
                        </ListItem>
                        {this.renderSeparator()}
                        {this.renderAdminList()}
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ homeReducer }) => {
    const { isAdmin, authenticated } = homeReducer;
    return { isAdmin, authenticated };
};

export default connect(mapStateToProps, {
})(Sidebar);