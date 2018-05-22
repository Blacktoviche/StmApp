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
import { updateMyTasks, getMyTasksByProject } from '../../actions/TaskActions';
import { updateMyProjects } from '../../actions/ProjectActions';
import { getBadgeByProgress, getProgressBadge, getRandomColor,
    getTaskStatusText, getMainColor, getSubMainColor } from '../../utils/Utils';


class MyTasks extends Component {

    componentWillMount() {
        this.props.updateMyProjects(this.props.userId);
    }

    onMyTasksByProject(project) {
        if(project != null)
        this.props.getMyTasksByProject(project);
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
                        <Title>My Tasks</Title>
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
                <Text></Text>{this.props.selectedProject ? getBadgeByProgress(this.props.selectedProject.progress, 'Project: ' + this.props.selectedProject.name) : null}
                <Grid>
                    <Row>
                        <List style={{ flex: 8, backgroundColor: `${getSubMainColor()}`, borderRadius: 5 }}>
                            <ListItem>
                                <Left style={{ flex: 2 }}>
                                    <Text>Title</Text>
                                </Left>
                                <Body style={{ flex: 3 }}>
                                    <Text style={{ alignSelf: 'center' }}>Progress</Text>
                                </Body>
                                <Right style={{ flex: 3 }}>
                                    <Text>MyProgress</Text>
                                </Right>
                            </ListItem>
                        </List>
                    </Row>
                    <Row>
                        <List  dataArray={this.props.tasks}
                                renderRow={(task) =>
                                <ListItem>
                                    <Left>
                                        <Text note>{task.title}
                                        </Text>
                                    </Left>
                                    <Body>
                                        {getProgressBadge(task.progress)}
                                    </Body>
                                    <Right>
                                        {getProgressBadge(task.statistics.myProgress)}
                                    </Right>
                                </ListItem>}>
                        </List>
                    </Row>
                </Grid>
            </Content>
        </Container >);
    }
}


const mapStateToProps = ({ taskReducer }) => {
    const { projects, selectedProject, tasks, userId } = taskReducer;
    return { projects, selectedProject, tasks, userId };
};

export default connect(mapStateToProps, {
    updateMyProjects, getMyTasksByProject
})(MyTasks);