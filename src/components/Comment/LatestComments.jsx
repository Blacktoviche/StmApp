import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, List, ListItem, Badge, Text, Left, Right } from 'native-base';
import { updateLatestComments } from '../../actions/CommentActions';
import { routeTo } from '../../actions/SideBarActions';
import { BODY_COMMENTS, BODY_MY_COMMENTS } from '../../utils/Utils';
import { getProgressBadge, getSubMainColor } from '../../utils/Utils';


class LatestComments extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('idADmin:: ', this.props.isAdmin);
        this.props.updateLatestComments(this.props.isAdmin);
    }

    onCommentsTable() {
        if(this.props.isAdmin){
            this.props.routeTo(BODY_COMMENTS);
        }else{
            this.props.routeTo(BODY_MY_COMMENTS);
        }
    }

    render() {
        return (
            <Card>
            <CardItem header style={{ backgroundColor: `${getSubMainColor()}`}}>
                <Text style={{ color: 'white'}}>Latest Comments</Text>
            </CardItem>
            <CardItem cardBody>
                <List dataArray={this.props.latestComments}
                    renderRow={(comment) =>
                        <ListItem>
                            <Left>
                            <Text note>{comment.commentText ? comment.commentText.substring(0, 50) :
                                comment.commentText}...</Text>
                            </Left>
                            <Right>
                            {getProgressBadge(comment.progress)}
                            </Right>
                        </ListItem>
                    }>
                </List>
            </CardItem>
        </Card>
        );
    }
}

const mapStateToProps = ({ commentReducer }) => {
    const { latestComments } = commentReducer;
    return { latestComments };
};

export default connect(mapStateToProps, {
    updateLatestComments, routeTo
})(LatestComments);