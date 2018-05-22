import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import {
    Container, Content, Badge, Text, Picker,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, Input, Textarea, Form, CardItem, Toast, Switch, CheckBox
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    newTask, saveTask, getTasksByProject,
    getAllProjects, editTask, deleteTask, updateAllUsers, updateSelectedTaskUsers,
    taskTitleChanged, taskDescChanged, usersListChanged, cancelTaskModal
} from '../../actions/TaskActions';
import Immutable from 'immutable';
import styles from '../Style/styles';
import { getBadgeByProgress, getProgressBadge, getTaskStatusText, getMainColor, getSubMainColor } from '../../utils/Utils';


class Tasks extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showToast: false
        };
    }

    componentWillMount() {
        this.props.getAllProjects();
    }

    componentDidMount() {
        console.log('selectedProject:: ', this.props.selectedProject);
        this.props.getTasksByProject(this.props.selectedProject);
    }

    onSaveTask() {
        //console.log('selectedProjectDID::', this.props.selectedProject);
        const { taskId, taskTitle, taskDesc } = this.props;
        let taskUsersIds = [];
        this.props.selectedUsersList.map(user => {
            taskUsersIds.push(user.id);
        });
        this.props.saveTask(
            { id: taskId, title: taskTitle, description: taskDesc, assignedToUsersIds: taskUsersIds },
            this.props.selectedProject);
    }

    onTaskTitleChanged(text) {
        this.props.taskTitleChanged(text);
    }

    onTaskDescChanged(text) {
        this.props.taskDescChanged(text);
    }

    onNewTask() {
        this.props.updateAllUsers();
        if (this.props.selectedProject !== null && this.props.selectedProject.id !== null) {
            this.props.newTask();
        } else {
            Alert.alert(
                'Select Project',
                'No project selected!',
                [
                    { text: 'Ok', style: 'cancel' },
                ],
                { cancelable: true }
            )
        }
    }

    onEditTask(task) {
        this.props.updateSelectedTaskUsers(task.id);
        this.props.editTask(task);
    }

    onDeleteTask(task) {
        Alert.alert(
            'Confirm Delete',
            'Confirm delete task: ' + task.title,
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => this.onConfirmDeleteTask(task.id) },
            ],
            { cancelable: true }
        )

    }

    onConfirmDeleteTask(id) {
        this.props.deleteTask(id, this.props.selectedProject);
    }

    onTasksByProject(project) {
        //let selectedProject = project; //this.props.projects.find(proj => proj.id == e.target.value);
        console.log('selected val: ', project);
        if(project != null)
        this.props.getTasksByProject(project);
    }

    onCancelModal() {
        this.props.cancelTaskModal();
    }

    onRemoveUser(user, rowID, sectionID) {
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);
        this.props.usersListChanged(taskUsers.push(user).toArray(), selectedUsers.delete(sectionID).toArray());
    }

    onAddUser(user, rowID, sectionID) {
        console.log('user:', rowID, sectionID);
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);
        this.props.usersListChanged(taskUsers.delete(sectionID).toArray(), selectedUsers.push(user).toArray());
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (<Container>
            <Content padder>
                <Header style={{ backgroundColor: `${getMainColor()}`}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tasks</Title>
                    </Body>
                    <Right>
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode="dropdown"
                            selectedValue={this.props.selectedProject}
                            onValueChange={this.onTasksByProject.bind(this)}>
                            <Picker.Item label="Select Project" value={null}/>
                            {this.props.projects.map((project, index) => {
                                return (
                                    <Picker.Item key={index} label={project.name} value={project} />
                                )
                            })}
                        </Picker>
                    </Right>
                </Header>
                <Text></Text>{this.props.selectedProject ? getBadgeByProgress(this.props.selectedProject.progress, 'Project: '+this.props.selectedProject.name) : null}
                
                <List dataSource={this.ds.cloneWithRows(this.props.tasks)}
                    renderRow={(task, rowID, sectionID) =>
                        <ListItem>
                            <Left>
                                <Text note>{task.title}
                                </Text>
                            </Left>
                            <Right>
                                {getProgressBadge(task.progress)}
                            </Right>
                        </ListItem>}
                    renderLeftHiddenRow={task =>
                        <Button full warning onPress={() => this.onEditTask(task)}>
                            <Icon active name="md-create" />
                        </Button>}
                    renderRightHiddenRow={(task) =>
                        <Button full danger onPress={() => this.onDeleteTask(task)}>
                            <Icon active name="trash" />
                        </Button>}
                    leftOpenValue={75}
                    rightOpenValue={-75}>
                </List>
            </Content>
            <Fab style={{ backgroundColor: '#34A34F' }}
                position='bottomRight'
                onPress={() => this.onNewTask()}>
                <Icon name="md-add-circle" />
            </Fab>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.taskModalOpen}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                <Container>
                    <Content padder>
                        <Card rounded>
                            <CardItem header  style={{ backgroundColor: `${getSubMainColor()}` }}>
                            <Text style={{color: 'white'}}>{this.props.taskTitle != '' ? 'Edit Task' : 'New Task'}</Text>
                            </CardItem>
                            <Input rounded placeholder="Task Title"
                                value={this.props.taskTitle}
                                onChangeText={this.onTaskTitleChanged.bind(this)}
                                style={styles.textinputC} />

                            <Textarea rounded bordered rowSpan={5}
                                placeholder={"Task Description"}
                                value={this.props.taskDesc}
                                onChangeText={this.onTaskDescChanged.bind(this)}
                                style={styles.textinputC}
                            />
                            <CardItem cardBody>
                                <Grid>
                                    <Col size={50}>
                                        <Text>All Users</Text>
                                        <List dataArray={this.props.taskUsersList}
                                            renderRow={(user, rowID, sectionID) =>
                                                <ListItem>
                                                    <Left>
                                                        <Text>{user.username}</Text>
                                                    </Left>
                                                    <Right>
                                                        <TouchableHighlight onPress={() => this.onAddUser(user, rowID, sectionID)}>
                                                            <Icon success type="FontAwesome" name="arrow-right" />
                                                        </TouchableHighlight>
                                                    </Right>
                                                </ListItem>
                                            }>
                                        </List>
                                    </Col>
                                    <Col size={50}>
                                        <Text>Selected Users</Text>
                                        <List dataArray={this.props.selectedUsersList}
                                            renderRow={(user, rowID, sectionID) =>
                                                <ListItem>
                                                    <Left>
                                                        <Text>{user.username}</Text>
                                                    </Left>
                                                    <Right>
                                                        <TouchableHighlight onPress={() => this.onRemoveUser(user, rowID, sectionID)}>
                                                            <Icon danger type="FontAwesome" name="trash" />
                                                        </TouchableHighlight>
                                                    </Right>
                                                </ListItem>
                                            }>
                                        </List>
                                    </Col>
                                </Grid>
                            </CardItem>
                            <Text style={styles.errorTextStyle}>
                                {this.props.taskSaveError}
                            </Text>
                            <CardItem footer>
                                <Button rounded full success style={styles.buttonStyle}
                                    onPress={() => this.onSaveTask()}>
                                    <Text>Save</Text>
                                </Button>
                                <Button rounded full danger style={styles.buttonStyle}
                                    onPress={() => this.onCancelModal()}>
                                    <Text>Cancel</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </Modal>
        </Container >);
    }
}


const mapStateToProps = ({ taskReducer }) => {
    const { taskTitle, taskDesc, taskId, selectedProject, tasks, projects,
        taskSaveError, taskModalOpen,
        taskUsersList, selectedUsersList, } = taskReducer;
    return {
        taskTitle, taskDesc, taskId, selectedProject, tasks, projects,
        taskSaveError, taskModalOpen,
        taskUsersList, selectedUsersList,
    };
};

export default connect(mapStateToProps, {
    newTask, editTask, saveTask, deleteTask, getTasksByProject,
    getAllProjects, updateAllUsers, updateSelectedTaskUsers,
    taskTitleChanged, taskDescChanged, usersListChanged, cancelTaskModal
})(Tasks);