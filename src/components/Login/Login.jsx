import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import {
    Container, Content, Form, Item,
    Input, Grid, Col, Spinner, Toast, Icon, Button, Text, Card, CardItem
} from 'native-base';
import { login, usernameChanged, passwordChanged, setupLogin } from '../../actions/AuthActions';
import styles from '../Style/styles';

class Login extends Component {

    onLogin() {
        const { username, password } = this.props;
        this.props.login(username, password);
    }

    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image source={require('../../assets/imgz/logo.png')}
                        style={styles.imageStyle} />
                    <Form>
                        <Item rounded>
                            <Input placeholder="Username" value={this.props.username}
                                onChangeText={this.onUsernameChange.bind(this)} />
                        </Item>
                        <Item rounded>
                            <Input placeholder="Password" value={this.props.password} secureTextEntry
                                onChangeText={this.onPasswordChange.bind(this)} />
                        </Item>
                        <Item>
                            <Text style={styles.errorTextStyle}>
                                {this.props.loginError}
                            </Text>
                        </Item>
                        <Item last>
                            <Button full rounded onPress={this.onLogin.bind(this)}>
                                <Text>Login</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = ({ authReducer }) => {
    const { username, password, loginError, loading, authenticated } = authReducer;
    return { username, password, loginError, loading, authenticated };
};

export default connect(mapStateToProps, {
    usernameChanged, passwordChanged, login, setupLogin
})(Login);