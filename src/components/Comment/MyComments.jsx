import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput, ScrollView, Slider } from 'react-native';
import {
    Container, Content, Badge, Text, Picker,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, Input, Textarea, Form, CardItem, Toast, Switch, CheckBox
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { updateMyProjects } from '../../actions/ProjectActions';
import { getMyTasksByProject } from '../../actions/TaskActions';
import {
    getMyCommentsByTask, deleteComment,
    newComment, commentProgressChanged, commentTextChanged, cancelCommentModal, saveComment
} from '../../actions/CommentActions';
import styles from '../Style/styles';
import { getBadgeByProgress, getProgressBadge, getMainColor, getSubMainColor } from '../../utils/Utils';


class MyComments extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showToast: false
        };
    }



    componentWillMount() {
        this.props.updateMyProjects();
    }

    alertNoSelectedTask() {
        Alert.alert(
            'Select Task',
            'No task selected!',
            [
                { text: 'Ok', style: 'cancel' },
            ],
            { cancelable: true }
        )
    }

    alertCompletedTask() {
        Alert.alert(
            'Task Completed',
            'This task is completed!',
            [
                { text: 'Ok', style: 'cancel' },
            ],
            { cancelable: true }
        )
    }

    onMyTasksByProject(project) {
        if (project != null)
            this.props.getMyTasksByProject(project);
    }

    onMyCommentsByTask(task) {
        if (task != null)
            this.props.getMyCommentsByTask(task);
    }

    onNewComment() {
        console.log('selectedTask:: ', this.props.selectedTask);
        if (this.props.selectedTask !== null && this.props.selectedTask.id !== null) {
            //check if task completed
            if (this.props.selectedTask.status == 0) {
                this.props.newComment(this.props.selectedTask.progress);
            } else {
                this.alertCompletedTask();
            }
        } else {
            this.alertNoSelectedTask();
        }
    }

    onSaveComment() {
        const { commentText, commentProgress } = this.props;
        this.props.saveComment({ commentText: commentText, progress: commentProgress },
            this.props.selectedTask);
    }

    onCommentProgressChanged(progressValue) {
        this.props.commentProgressChanged(progressValue);
    }

    onCommentTextChanged(text) {
        this.props.commentTextChanged(text);
    }

    onCancelNewComment() {
        this.props.cancelCommentModal();
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
                <Header style={{ backgroundColor: `${getMainColor()}` }}>
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
                            onValueChange={this.onMyTasksByProject.bind(this)}>
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
                    <Row size={50} style={{ paddingTop: 3 }}>
                        {this.props.selectedProject ? getBadgeByProgress(this.props.selectedProject.progress, 'Project: ' + this.props.selectedProject.name) : null}
                    </Row>
                    <Col size={50} style={{ paddingBottom: 4 }}>
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            mode="dropdown"
                            selectedValue={this.props.selectedTask}
                            onValueChange={this.onMyCommentsByTask.bind(this)}>
                            <Picker.Item label="Select Task" value={null} />
                            {this.props.tasks.map((task, index) => {
                                return (
                                    <Picker.Item key={index} label={task.title} value={task} />
                                )
                            })}
                        </Picker>
                        {this.props.selectedTask ? getBadgeByProgress(this.props.selectedTask.progress, 'Task: ' + this.props.selectedTask.title) : null}
                    </Col>
                    <Row><Text style={{ paddingTop: 4, paddingBottom: 4 }}>Comments</Text></Row>
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
            <Fab style={{ backgroundColor: '#34A34F' }}
                position='bottomRight'
                onPress={() => this.onNewComment()}>
                <Icon name="md-add-circle" />
            </Fab>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.commentModalOpen}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                <Container>
                    <Content padder>
                        <Card rounded>
                            <CardItem header style={{ backgroundColor: `${getSubMainColor()}` }}>
                                <Text>New Comment</Text>
                            </CardItem>
                            <Text>Task Progress:    {this.props.minimumCommentProgress}%</Text>
                            <Text>Comment Progress: {this.props.commentProgress}%</Text>
                            <Slider maximumValue={100}
                                step={1}
                                value={this.props.commentProgress}
                                onSlidingComplete={this.onCommentProgressChanged.bind(this)} />
                            <Textarea rounded bordered rowSpan={5}
                                placeholder={"Comment Text"}
                                value={this.props.commentText}
                                onChangeText={this.onCommentTextChanged.bind(this)}
                                style={styles.textinputC}
                            />
                            <Text style={styles.errorTextStyle}>
                                {this.props.commentSaveError}
                            </Text>

                            <CardItem footer>
                                <Button rounded full success style={styles.buttonStyle}
                                    onPress={() => this.onSaveComment()}>
                                    <Text>Save</Text>
                                </Button>
                                <Button rounded full danger style={styles.buttonStyle}
                                    onPress={() => this.onCancelNewComment()}>
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


const mapStateToProps = ({ commentReducer }) => {
    const { selectedProject, selectedTask, projects, tasks, comments, minimumCommentProgress,
        commentText, commentProgress, commentModalOpen, commentSaveError } = commentReducer;
    return {
        selectedProject, selectedTask, projects, tasks, comments, minimumCommentProgress,
        commentText, commentProgress, commentModalOpen, commentSaveError
    };
};

export default connect(mapStateToProps, {
    updateMyProjects, getMyTasksByProject, getMyCommentsByTask, deleteComment,
    newComment, commentProgressChanged, commentTextChanged, cancelCommentModal, saveComment
})(MyComments);