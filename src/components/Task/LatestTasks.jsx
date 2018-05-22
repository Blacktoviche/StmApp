import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, List, ListItem, Badge, Text, Left, Right } from 'native-base';
import { updateLatestTasks } from '../../actions/TaskActions';
import { routeTo } from '../../actions/SideBarActions';
import { getProgressBadge, getSubMainColor } from '../../utils/Utils';


class LatestTasks extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.updateLatestTasks(this.props.isAdmin);
    }

 

    render() {
        return (
            <Card>
                <CardItem header style={{ backgroundColor: `${getSubMainColor()}`}}>
                    <Text style={{ color: 'white'}}>Latest Tasks</Text>
                </CardItem>
                <CardItem cardBody>
                    <List dataArray={this.props.latestTasks}
                        renderRow={(task) =>
                            <ListItem>
                                <Left>
                                <Text note>{task.title ? task.title.substring(0, 50) :
                                    task.title}...</Text>
                                </Left>
                                <Right>
                                {getProgressBadge(task.progress)}
                                </Right>
                            </ListItem>
                        }>
                    </List>
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = ({ taskReducer }) => {
    const { latestTasks } = taskReducer;
    return { latestTasks };
};

export default connect(mapStateToProps, {
    updateLatestTasks, routeTo
})(LatestTasks);