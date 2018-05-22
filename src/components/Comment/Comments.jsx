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
    getAllProjects, getTasksByProject,
    getCommentsByTask, deleteComment
} from '../../actions/CommentActions';

import { getBadgeByProgress, getProgressBadge, getMainColor } from '../../utils/Utils';


class Comments extends Component {

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

    onTasksByProject(project) {
        if (project != null)
            this.props.getTasksByProject(project);
    }

    onCommentsByTask(task) {
        if (task != null)
            this.props.getCommentsByTask(task);
    }

    onDeleteComment(comment) {
        
        Alert.alert(
            'Confirm Delete',
            'Confirm delete Comment: ',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => this.onConfirmDeleteComment(comment.id) },
            ],
            { cancelable: true }
        )

    }

    onConfirmDeleteComment(id) {
        this.props.deleteComment(id, this.props.selectedTask);
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
                        <Title>Comments</Title>
                    </Body>
                    <Right>
                    <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode="dropdown"
                            selectedValue={this.props.selectedProject}
                            onValueChange={this.onTasksByProject.bind(this)}>
                            <Picker.Item label="Select Project" value={null} />
                            {this.props.projects.map((project, index) => {
                                return (
                                    <Picker.Item key={index} label={project.name} value={project} />
                                )
                            })}
                        </Picker>
                    </Right>
                </Header>
                <Grid>
                    <Row size={50} style={{paddingTop: 3}}>
                       {this.props.selectedProject ? getBadgeByProgress(this.props.selectedProject.progress, 'Project: '+this.props.selectedProject.name) : null}
                    </Row>
                    <Col size={50} style={{paddingBottom: 4}}>
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode="dropdown"
                            selectedValue={this.props.selectedTask}
                            onValueChange={this.onCommentsByTask.bind(this)}>
                            <Picker.Item label="Select Task" value={null} />
                            {this.props.tasks.map((task, index) => {
                                return (
                                    <Picker.Item key={index} label={task.title} value={task} />
                                )
                            })}
                        </Picker>
                        {this.props.selectedTask ? getBadgeByProgress(this.props.selectedTask.progress, 'Task: '+this.props.selectedTask.title) : null}
                    </Col>
                    <Row><Text style={{paddingTop: 4, paddingBottom: 4}}>Comments</Text></Row>
                    <Row size={100}>
                        
                        <List dataSource={this.ds.cloneWithRows(this.props.comments)}
                            renderRow={(comment, rowID, sectionID) =>
                                <ListItem>
                                    <Left>
                                        <Text note>{comment.commentText}
                                        </Text>
                                    </Left>
                                    <Right>
                                        {getProgressBadge(comment.progress)}
                                    </Right>
                                </ListItem>}
                            renderRightHiddenRow={(comment) =>
                                <Button full danger onPress={() => this.onDeleteComment(comment)}>
                                    <Icon active name="trash" />
                                </Button>}
                            leftOpenValue={75}
                            rightOpenValue={-75}>
                        </List>
                    </Row>
                </Grid>
            </Content>
        </Container >);
    }
}


const mapStateToProps = ({ commentReducer }) => {
    const { selectedProject, selectedTask, projects, tasks, comments } = commentReducer;
    return { selectedProject, selectedTask, projects, tasks, comments };
};

export default connect(mapStateToProps, {
    getAllProjects, getTasksByProject, getCommentsByTask, deleteComment
})(Comments);