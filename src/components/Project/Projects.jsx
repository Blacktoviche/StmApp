import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput } from 'react-native';
import {
    Container, Content, Badge, Text,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, Input, Textarea, Form, CardItem
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    updateAllProjects, newProject, editProject, deleteProject, updateAllUsers,
    projectNameChanged, projectDescChanged, saveProject,
    cancelNewProject
} from '../../actions/ProjectActions';
import styles from '../Style/styles';
import { getProgressBadge, getMainColor, getSubMainColor} from '../../utils/Utils';

class Projects extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }
    componentWillMount() {
        //console.log('project:: ', this.props.projects);
        this.props.updateAllProjects();
    }

    componentDidMount() {
        console.log('project:: ', this.props.projects);
    }

    onNewProject() {
        this.props.updateAllUsers();
        this.props.newProject();
        //this.props.navigation.navigate('AddEditProject');
    }

    onEditProject(project) {
        //console.log('project:: ', project);
        this.props.editProject(project);
    }

    onCancelModal() {
        this.props.cancelNewProject();
    }

    onDeleteProject(project) {
        Alert.alert(
            'Confirm Delete',
            'Confirm delete project ' + project.name,
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => this.onConfirmDeleteProject(project.id) },
            ],
            { cancelable: true }
        )
    }

    onConfirmDeleteProject(id) {
        this.props.deleteProject(id);
    }

    onSaveProject() {
        const { projectId, projectName, projectDesc } = this.props;
        this.props.saveProject({
            id: projectId, name: projectName,
            description: projectDesc, tasks: this.props.tasksList
        });
    }

    onProjectNameChanged(text) {
        this.props.projectNameChanged(text);
    }

    onProjectDescChanged(text) {
        this.props.projectDescChanged(text);
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
                            <Title>Projects</Title>
                        </Body>
                    </Header>
                    <Grid style={{ paddingTop: 4 }}>
                            <List dataSource={this.ds.cloneWithRows(this.props.projects)}
                                renderRow={project =>
                                    <ListItem>
                                        <Left>
                                            <Text note>{project.name}
                                            </Text>
                                        </Left>
                                        <Right>
                                            {getProgressBadge(project.progress)}
                                        </Right>
                                    </ListItem>}
                                renderLeftHiddenRow={project =>
                                    <Button full warning onPress={() => this.onEditProject(project)}>
                                        <Icon active name="md-create" />
                                    </Button>}
                                renderRightHiddenRow={(project) =>
                                    <Button full danger onPress={() => this.onDeleteProject(project)}>
                                        <Icon active name="trash" />
                                    </Button>}
                                leftOpenValue={75}
                                rightOpenValue={-75}>
                            </List>
                    </Grid>
                </Content>
                <Fab style={{ backgroundColor: '#34A34F' }}
                    position='bottomRight'
                    onPress={() => this.onNewProject()}>
                    <Icon name="md-add-circle" />
                </Fab>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.projectModalOpen}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <Container>
                        <Content padder>
                            <Card rounded>
                                <CardItem header style={{ backgroundColor: `${getSubMainColor()}`, paddingBottom: 2 }}>
                                    <Text style={{color: 'white'}}>{this.props.selectedProject != null ? 'Edit Project' : 'New Project'}</Text>
                                </CardItem>
                                <Input rounded placeholder="Project Name"
                                    value={this.props.projectName}
                                    onChangeText={this.onProjectNameChanged.bind(this)}
                                    style={styles.textinputC} />

                                <Textarea rounded bordered rowSpan={5}
                                    placeholder={"Project Description"}
                                    value={this.props.projectDesc}
                                    onChangeText={this.onProjectDescChanged.bind(this)}
                                    style={styles.textinputC}
                                />
                                <Text style={styles.errorTextStyle}>
                                    {this.props.projectSaveError}
                                </Text>

                                <CardItem footer>
                                    <Button rounded full success style={styles.buttonStyle}
                                        onPress={() => this.onSaveProject()}>
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
            </Container >
        );
    }
}


const mapStateToProps = ({ projectReducer }) => {
    const { projects, projectModalOpen, projectId, projectName, projectDesc,
        selectedProject, projectSaveError } = projectReducer;
    return {
        projects, projectModalOpen, projectId, projectName, projectDesc,
        selectedProject, projectSaveError
    };
};

export default connect(mapStateToProps, {
    updateAllProjects,
    newProject,
    editProject,
    deleteProject,
    updateAllUsers,
    cancelNewProject,
    projectNameChanged,
    projectDescChanged,
    saveProject
})(Projects);
