import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLatestProject } from '../../actions/ProjectActions';
import { routeTo } from '../../actions/SideBarActions';
import { getProgressBadge, getSubMainColor } from '../../utils/Utils';
import { Card, CardItem, List, ListItem, Badge, Text, Container, Left, Right } from 'native-base';

class LatestProjects extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.updateLatestProject(this.props.isAdmin);
    }

    render() {
        return (
            <Card>
                <CardItem header style={{ backgroundColor: `${getSubMainColor()}`}}>
                    <Text style={{ color: 'white'}}>Latest Projects</Text>
                </CardItem>
                <CardItem cardBody>
                    <List dataArray={this.props.latestProjects}
                        renderRow={(project) =>
                            <ListItem>
                                <Left>
                                <Text note>{project.name ? project.name.substring(0, 50) :
                                    project.name}...
                                </Text>
                                </Left>
                                <Right>
                                {getProgressBadge(project.progress)}
                                </Right>
                            </ListItem>
                        }>
                    </List>
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const { latestProjects } = projectReducer;
    return { latestProjects };
};

export default connect(mapStateToProps, {
    updateLatestProject, routeTo
})(LatestProjects);