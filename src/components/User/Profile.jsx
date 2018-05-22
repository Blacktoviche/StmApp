import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput, Switch, TouchableHighlight } from 'react-native';
import {
    Container, Content, Badge, Text,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, Input, Picker, CardItem
} from 'native-base';
import {
    firstnameChanged, lastnameChanged, emailChanged, editProfile, defaultProfile, saveProfile,
    passwordChanged, rePasswordChanged, oldPasswordChanged, resetPassword, saveMyNewPwd, cancelNewPwd
} from '../../actions/UserActions';
import styles from '../Style/styles';
import { getMainColor, getSubMainColor } from '../../utils/Utils';

class Profile extends Component {


    componentWillMount() {
        this.props.defaultProfile(this.props.userProfile);
    }

    onFirstNameChanged(text) {
        this.props.firstnameChanged(text);
    }

    onLastNameChanged(text) {
        this.props.lastnameChanged(text);
    }

    onEmailChanged(text) {
        this.props.emailChanged(text);
    }

    onResetPassword() {
        this.props.resetPassword({ id: this.props.userId, username: this.props.username });
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onRePasswordChanged(text) {
        this.props.rePasswordChanged(text);
    }

    onOldPasswordChanged(text) {
        this.props.oldPasswordChanged(text);
    }

    onSaveProfile() {
        console.log('userId:: ', this.props.userId);
        let user = {
            id: this.props.userId,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
        };
        this.props.saveProfile(user);
    }

    onCancelEdit() {
        this.props.defaultProfile(this.props.userProfile);
    }

    onEditProfile() {
        this.props.editProfile();
    }

    onSaveNewPwd() {
        this.props.saveMyNewPwd(this.props.oldPassword, this.props.password, this.props.rePassword);
    }

    onCancelPwdReset() {
        this.props.cancelNewPwd();
    }

    onPickerValue(value) {
        console.log('value:: ', value);
        if (value == 0) {
            this.onEditProfile();
        } else {
            this.onResetPassword();
        }
    }

    renderFooter() {
        if (this.props.profileEditMod) {
            return (
                <CardItem footer>
                    <Button rounded full success style={styles.buttonStyle}
                        onPress={() => this.onSaveProfile()}>
                        <Text>Save</Text>
                    </Button>
                    <Button rounded full danger style={styles.buttonStyle}
                        onPress={() => this.onCancelEdit()}>
                        <Text>Cancel</Text>
                    </Button>
                </CardItem>
            );
        }
    }

    render() {
        return (<Container>
            <Content padder>
                <Header style={{ backgroundColor: `${getMainColor()}` }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onEditProfile.bind(this)}>
                            <Icon active name="md-create" />
                        </Button>
                        <Button transparent onPress={this.onResetPassword.bind(this)}>
                            <Icon type="FontAwesome" name="key" />
                        </Button>
                    </Right>
                </Header>
                <Card style={{ paddingTop: 3 }}>
                    <Item style={{ flex: 3 }}>
                        <Text style={{ flex: 1 }}>Username:  </Text>
                        <Input rounded bordered
                            value={this.props.username}
                            style={styles.textinputC}
                            disabled={true} />
                    </Item>
                    <Item style={{ flex: 3 }}>
                        <Text style={{ flex: 1 }}>First Name: </Text>
                        <Input rounded bordered
                            value={this.props.firstname}
                            onChangeText={this.onFirstNameChanged.bind(this)}
                            style={styles.textinputC}
                            disabled={!this.props.profileEditMod} />
                    </Item>
                    <Item style={{ flex: 3 }}>
                        <Text style={{ flex: 1 }}>Last Name: </Text>
                        <Input rounded bordered
                            value={this.props.lastname}
                            onChangeText={this.onLastNameChanged.bind(this)}
                            style={styles.textinputC}
                            disabled={!this.props.profileEditMod} />
                    </Item>
                    <Item style={{ flex: 3 }}>
                        <Text style={{ flex: 1 }}>E-Mail:     </Text>
                        <Input rounded bordered
                            value={this.props.email}
                            onChangeText={this.onEmailChanged.bind(this)}
                            style={styles.textinputC}
                            disabled={!this.props.profileEditMod} />
                    </Item>
                    <Item style={{ flex: 4, paddingTop: 2 }}>
                        <Text >Enabled</Text>
                        <Switch style={{ flex: 3 }}
                            value={this.props.enabled}
                            disabled={true} />
                    </Item>
                    <Item style={{ flex: 4, paddingTop: 2 }}>
                        <Text>Admin</Text>
                        <Switch style={{ flex: 3 }}
                            value={this.props.beautifyRoleName === 'Admin' ? true : false}
                            disabled={true} />
                    </Item>
                    <Text style={styles.errorTextStyle}>
                        {this.props.userSaveMsg}
                    </Text>
                    {this.renderFooter()}
                </Card>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.resetPwdModal}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <Container>
                        <Content>
                            <Card rounded>
                                <CardItem header style={{ backgroundColor: `${getSubMainColor()}` }}>
                                    <Text>Password Reset</Text>
                                </CardItem>
                                <Item style={{ flex: 3, paddingTop: 4 }}>
                                    <Text style={{ flex: 1 }}>Old Password: </Text>
                                    <Input value={this.props.oldPassword} secureTextEntry
                                        onChangeText={this.onOldPasswordChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Item style={{ flex: 3, paddingTop: 4 }}>
                                    <Text style={{ flex: 1 }}>New Password: </Text>
                                    <Input value={this.props.password} secureTextEntry
                                        onChangeText={this.onPasswordChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Item style={{ flex: 3 }}>
                                    <Text style={{ flex: 1 }}>Re-New Password: </Text>
                                    <Input value={this.props.rePassword} secureTextEntry
                                        onChangeText={this.onRePasswordChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Text style={styles.errorTextStyle}>
                                    {this.props.resetPwdSaveMsg}
                                </Text>
                                <CardItem footer>
                                    <Button rounded full success style={styles.buttonStyle}
                                        onPress={() => this.onSaveNewPwd()}>
                                        <Text>Save</Text>
                                    </Button>
                                    <Button rounded full danger style={styles.buttonStyle}
                                        onPress={() => this.onCancelPwdReset()}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </Modal>
            </Content>
        </Container>);
    }

}

const mapStateToProps = ({ userReducer }) => {
    const { userProfile, userId, username, firstname, lastname, email, enabled, beautifyRoleName,
        oldPassword, password, rePassword, resetPwdSaveMsg, resetPwdModal, userSaveMsg, profileEditMod } = userReducer;
    return {
        userProfile, userId, username, firstname, lastname, email, enabled, beautifyRoleName,
        oldPassword, password, rePassword, resetPwdSaveMsg, resetPwdModal, userSaveMsg, profileEditMod
    };
};

export default connect(mapStateToProps, {
    firstnameChanged, lastnameChanged, emailChanged, editProfile, defaultProfile, saveProfile,
    passwordChanged, rePasswordChanged, oldPasswordChanged, resetPassword, saveMyNewPwd, cancelNewPwd,
})(Profile);
