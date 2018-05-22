import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput, Switch, TouchableHighlight } from 'react-native';
import {
    Container, Content, Badge, Text,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, Input, Textarea, Form, CardItem
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    newUser, editUser, deleteUser, cancelNewUser, usernameChanged,
    firstnameChanged, lastnameChanged, passwordChanged, rePasswordChanged,
    enabledChanged, userRoleChanged, emailChanged, saveUser, updateAllUsers,
    resetPassword, saveNewPwd, cancelNewPwd
} from '../../actions/UserActions';
import styles from '../Style/styles';
import { getRandomColor, getMainColor, getSubMainColor } from '../../utils/Utils';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentWillMount() {
        this.props.updateAllUsers();
    }

    onUsernameChanged(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onRePasswordChanged(text) {
        this.props.rePasswordChanged(text);
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

    onEnabledChanged(value) {
        this.props.enabledChanged(value);
    }

    onUserRoleChanged(value) {
        this.props.userRoleChanged(value ? 'Admin' : 'User');
    }

    onSaveUser() {
        console.log('saveUser: ', this.props.userId);
        let user = {
            id: this.props.userId,
            username: this.props.username,
            userPassword: this.props.password,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            enabled: this.props.enabled,
            beautifyRoleName: this.props.beautifyRoleName,
        };
        this.props.saveUser(user, this.props.editMod, this.props.rePassword);
    }

    onNewUser() {
        this.props.newUser();
    }

    onEditUser(user) {
        console.log('user:: ', user);
        this.props.editUser(user);
    }

    onResetPassword(user) {
        this.props.resetPassword(user);
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onRePasswordChanged(text) {
        this.props.rePasswordChanged(text);
    }

    onSaveNewPwd() {
        this.props.saveNewPwd(this.props.userId, this.props.password, this.props.rePassword);
    }

    onCancelPwdReset() {
        this.props.cancelNewPwd();
    }

    onCancelNewUser() {
        this.props.cancelNewUser();
    }

    onDeleteUser(user) {
        Alert.alert(
            'Confirm Delete',
            'Confirm delete User:  ' + user.username,
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => this.onConfirmDeleteUser(user.id) },
            ],
            { cancelable: true }
        )

    }

    onConfirmDeleteUser(id) {
        this.props.deleteUser(id);
    }

    renderPasswordInput() {
        if (!this.props.editMod) {
            return (
                <Item style={{ flex: 3 }}>
                    <Text style={{ flex: 1 }}>Password: </Text>
                    <Input value={this.props.password} secureTextEntry
                        onChangeText={this.onPasswordChanged.bind(this)}
                        style={styles.textinputC} />
                </Item>
            );
        }
    }

    renderRePasswordInput() {
        if (!this.props.editMod) {
            return (
                <Item style={{ flex: 3 }}>
                    <Text style={{ flex: 1 }}>Re-Password: </Text>
                    <Input value={this.props.rePassword} secureTextEntry
                        onChangeText={this.onRePasswordChanged.bind(this)}
                        style={styles.textinputC} />
                </Item>

            );
        }
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Content padder>
                    <Header style={{ backgroundColor: `${getMainColor()}`}}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Users</Title>
                        </Body>
                    </Header>
                    <Grid style={{ paddingTop: 4 }}>
                        <Row>
                            <List style={{ flex: 8, backgroundColor: `${getSubMainColor()}`, borderRadius: 5 }}>
                                <ListItem>
                                    <Left style={{ flex: 2 }}>
                                        <Text>Username</Text>
                                    </Left>
                                    <Body style={{ flex: 4 }}>
                                        <Text style={{ alignSelf: 'center' }}>E-Mail</Text>
                                    </Body>
                                    <Right style={{ flex: 2 }}>
                                        <Text>Admin</Text>
                                    </Right>
                                </ListItem>
                            </List>
                        </Row>
                        <Row>
                            <List dataSource={this.ds.cloneWithRows(this.props.users)}
                                renderRow={user =>
                                    <ListItem style={{ flex: 8 }}>
                                        <Left style={{ flex: 2 }}>
                                            <Text>{user.username}</Text>
                                        </Left>
                                        <Body style={{ flex: 5 }}>
                                            <Text>{user.email}</Text>
                                        </Body>
                                        <Right style={{ flex: 1 }}>
                                            <Switch value={user.beautifyRoleName === 'Admin' ? true : false}></Switch>
                                        </Right>
                                    </ListItem>}
                                renderLeftHiddenRow={user =>
                                    <Grid><Col><Button primary onPress={() => this.onEditUser(user)}>
                                        <Icon active name="md-create" />
                                    </Button></Col>
                                        <Col><Button danger onPress={() => this.onResetPassword(user)}>
                                            <Icon type="FontAwesome" name="key" />
                                        </Button></Col></Grid>}
                                renderRightHiddenRow={(user) =>
                                    <Button full danger onPress={() => this.onDeleteUser(user)}>
                                        <Icon active name="trash" />
                                    </Button>}
                                leftOpenValue={120}
                                rightOpenValue={-75}>
                            </List>
                        </Row>
                    </Grid>
                </Content>
                <Fab style={{ backgroundColor: '#34A34F' }}
                    position='bottomRight'
                    onPress={() => this.onNewUser()}>
                    <Icon name="md-add-circle" />
                </Fab>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.userModalOpen}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <Container>
                        <Content padder>
                            <Card rounded>
                                <CardItem header style={{ backgroundColor: `${getSubMainColor()}` }}>
                                    <Text>{this.props.editMod ? 'Edit User' : 'New User'}</Text>
                                </CardItem>
                                <Item style={{ flex: 3, paddingTop: 4 }}>
                                    <Text style={{ flex: 1 }}>Username: </Text>
                                    <Input rounded
                                        value={this.props.username}
                                        onChangeText={this.onUsernameChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                {this.renderPasswordInput()}
                                {this.renderRePasswordInput()}
                                <Item style={{ flex: 3 }}>
                                    <Text style={{ flex: 1 }}>First Name: </Text>
                                    <Input rounded bordered
                                        value={this.props.firstname}
                                        onChangeText={this.onFirstNameChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Item style={{ flex: 3 }}>
                                    <Text style={{ flex: 1 }}>Last Name: </Text>
                                    <Input rounded bordered
                                        value={this.props.lastname}
                                        onChangeText={this.onLastNameChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Item style={{ flex: 3 }}>
                                    <Text style={{ flex: 1 }}>E-Mail:     </Text>
                                    <Input rounded bordered
                                        value={this.props.email}
                                        onChangeText={this.onEmailChanged.bind(this)}
                                        style={styles.textinputC} />
                                </Item>
                                <Item style={{ flex: 4, paddingTop: 2 }}>
                                    <Text >Enabled</Text>
                                    <Switch style={{ flex: 3 }} onValueChange={this.onEnabledChanged.bind(this)}
                                        value={this.props.enabled} />
                                </Item>
                                <Item style={{ flex: 4, paddingTop: 2 }}>
                                    <Text>Admin</Text>
                                    <Switch style={{ flex: 3 }} onValueChange={this.onUserRoleChanged.bind(this)}
                                        value={this.props.beautifyRoleName === 'Admin' ? true : false} />
                                </Item>
                                <Text style={styles.errorTextStyle}>
                                    {this.props.userSaveMsg}
                                </Text>
                                <CardItem footer>
                                    <Button rounded full success style={styles.buttonStyle}
                                        onPress={() => this.onSaveUser()}>
                                        <Text>Save</Text>
                                    </Button>
                                    <Button rounded full danger style={styles.buttonStyle}
                                        onPress={() => this.onCancelNewUser()}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </Modal>
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
                                    <Text>Password Reset for user: {this.props.username} </Text>
                                </CardItem>
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
            </Container >
        );
    }

}


const mapStateToProps = ({ userReducer }) => {
    const { users, password, rePassword, resetPwdSaveMsg, resetPwdModal, username, userId, firstname, lastname,
        email, enabled, beautifyRoleName, userModalOpen, editMod, userSaveMsg } = userReducer;
    return {
        users, password, rePassword, resetPwdSaveMsg, resetPwdModal, username, userId, firstname, lastname,
        email, enabled, beautifyRoleName, userModalOpen, editMod, userSaveMsg
    };
};

export default connect(mapStateToProps, {
    newUser, editUser, deleteUser, cancelNewUser, usernameChanged,
    firstnameChanged, lastnameChanged, passwordChanged,
    enabledChanged, userRoleChanged, emailChanged, saveUser, updateAllUsers,
    rePasswordChanged, resetPassword, saveNewPwd, cancelNewPwd
})(Users);
