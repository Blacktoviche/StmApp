import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, ListView, Modal, TextInput } from 'react-native';
import {
    Container, Content, Badge, Text,
    Left, Right, List, ListItem,
    Header, Body, Title, Spinner, Button, Icon, Fab,
    Card, Item, CardItem
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { updateMyProjects } from '../../actions/ProjectActions';
import { getProgressBadge, getMainColor, getSubMainColor, getRandomColor } from '../../utils/Utils';

class MyProjects extends Component {

    componentWillMount() {
        this.props.updateMyProjects();
    }

    render() {

        return (
            <Container>
                <Content padder>
                    <Header style={{ backgroundColor: `${getMainColor()}` }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>My Projects</Title>
                        </Body>
                    </Header>
                    <Grid style={{paddingTop: 4}}>
                        <Row>
                            <List style={{ flex: 8, backgroundColor: `${getSubMainColor()}`, borderRadius: 5 }}>
                                <ListItem>
                                    <Left style={{ flex: 2 }}>
                                        <Text>Name</Text>
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
                            <List dataArray={this.props.myProjects}
                                renderRow={(project) =>
                                    <ListItem>
                                        <Left>
                                            <Text note>{project.name}
                                            </Text>
                                        </Left>
                                        <Body>
                                            {getProgressBadge(project.progress)}
                                        </Body>
                                        <Right>
                                            {getProgressBadge(project.statistics.myProgress)}
                                        </Right>
                                    </ListItem>
                                }>
                            </List>
                        </Row>
                    </Grid>
                </Content>
            </Container >
        );
    }
}


const mapStateToProps = ({ projectReducer }) => {
    const { myProjects, userId } = projectReducer;
    return { myProjects, userId };
};

export default connect(mapStateToProps, {
    updateMyProjects
})(MyProjects);
