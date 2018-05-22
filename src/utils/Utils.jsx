import React, { Component } from 'react';
import { Badge, Text } from 'native-base';

export const JWT_TOKEN = 'jwtToken';

export const BODY_PROJECTS = 'BODY_PROJECTS';
export const BODY_TASKS = 'BODY_TASKS';
export const BODY_COMMENTS = 'BODY_COMMENTS';
export const BODY_DEFAULT = 'BODY_DEFAULT';
export const BODY_USERS = 'BODY_USERS';
export const BODY_PROFILE = 'BODY_PROFILE';

export const BODY_MY_PROJECTS = 'BODY_MY_PROJECTS';
export const BODY_MY_TASKS = 'BODY_MY_TASKS';
export const BODY_MY_COMMENTS = 'BODY_MY_COMMENTS';


export const PROJECTS_BODY_TABLE = 'PROJECTS_BODY_TABLE';
export const PROJECTS_BODY_ADD_EDIT = 'PROJECTS_BODY_ADD_EDIT';

export const LATEST_PROJECTS_COUNT = 3;
export const LATEST_TASKS_COUNT = 3;
export const LATEST_COMMENTS_COUNT = 3;

export const API_DOMAIN = (url) => {
    return 'http://192.168.17.106:8080/api/' + url;
};

//For auth and logout only
export const API_DOMAIN_AUTH_LOGOUT = (url) => {
    return 'http://192.168.17.106:8080/' + url;
};

export const isAdmin = (beautifyRoleName) => {
    console.log('role::', beautifyRoleName);
    if (beautifyRoleName === 'Admin') {
        return true;
    }else {
        return false;
    }
};

export const getProgressBackground = (progress) => {
    switch (true) {
        case(progress <= 25):
            return 'danger';
        case(progress > 25 && progress <= 50):
            return 'warning';
        case(progress > 50 && progress <= 75):
            return 'info';
        case(progress > 75 && progress <= 99):
            return 'primary';
        case(progress == 100):
            return 'success';
        default:
            return 'danger';
    }
}


export const getProgressBadge = (progress) => {
    switch (true) {
        case(progress <= 25):
            return (<Badge danger><Text>{progress}%</Text></Badge>);
        case(progress > 25 && progress <= 50):
            return (<Badge warning><Text>{progress}%</Text></Badge>);
        case(progress > 50 && progress <= 75):
            return (<Badge info><Text>{progress}%</Text></Badge>);
        case(progress > 75 && progress <= 99):
            return (<Badge primary><Text>{progress}%</Text></Badge>);
        case(progress == 100):
            return (<Badge success><Text>{progress}%</Text></Badge>);
        default:
            return (<Badge danger><Text>{progress}%</Text></Badge>);
    }
}

export const getBadgeByProgress = (progress, text) => {
    switch (true) {
        case(progress <= 25):
            return (<Badge danger style={{paddingTop: 1}}><Text>{text}  {progress}%</Text></Badge>);
        case(progress > 25 && progress <= 50):
            return (<Badge warning style={{paddingTop: 1}}><Text>{text} {progress}%</Text></Badge>);
        case(progress > 50 && progress <= 75):
            return (<Badge info style={{paddingTop: 1}}><Text>{text} {progress}%</Text></Badge>);
        case(progress > 75 && progress <= 99):
            return (<Badge primary style={{paddingTop: 1}}><Text>{text} {progress}%</Text></Badge>);
        case(progress == 100):
            return (<Badge success style={{paddingTop: 1}}><Text>{text} {progress}%</Text></Badge>);
        default:
            return (<Badge danger style={{paddingTop: 1}}><Text>{text} {progress}%</Text></Badge>);
    }
}

export const getTaskStatusText = (status) => {
    switch (true) {
        case(status === 0):
            return 'In Progress';
        case(status === 1):
            return 'Completed';
        default:
            return 'In Progress';
    }
}

export const getEmptyProject = () => {
    return {
        id: 2,
        name: ' ',
        description: ' ',
        statistics: {
            completedTasks: 0,
            inProgressTasks: 0,
            closedTasks: 0,
            userProgress: []
        }
    };
}

export const fillTask = (title, description, assignedUsers) => {
    let assignedToUsersIds = [];
    assignedUsers.map( (user)=> {
        assignedToUsersIds.push(user.id);
    });

    return {
        title: title,
        description: description,
        progress: 0,
        status: 0,
        dateCreated: Date.now(),
        lastModefied: Date.now(),
        assignedToUsersIds: assignedToUsersIds
    };
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export const getDrawerLogoBG = () => {
    return getGradientColor('#084B8A', '#81BEF7', 0.7);
}

export const getSubMainColor = () => {
    return getGradientColor('#084B8A', '#81BEF7', 0.3);
}

export const getMainColor = () => {
    return getGradientColor('#084B8A', '#81BEF7', 0.4);
}
//This function based on answer from @desau & desau in stackoverflow
//https://stackoverflow.com/questions/3080421/javascript-color-gradient 
export const getGradientColor = (start_color, end_color, percent) => {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');
 
    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(start_color.length == 3){
      start_color = start_color.replace(/(.)/g, '$1$1');
    }
 
    if(end_color.length == 3){
      end_color = end_color.replace(/(.)/g, '$1$1');
    }
 
    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);
 
    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);
 
    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;
 
    diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
 
    // ensure 2 digits by color
    if( diff_red.length == 1 ) diff_red = '0' + diff_red
    if( diff_green.length == 1 ) diff_green = '0' + diff_green
    if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue
 
    return '#' + diff_red + diff_green + diff_blue;
  };