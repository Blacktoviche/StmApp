import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { changeCurrentScreen } from './src/actions/HomeActions';
import Sidebar from './src/components/Sidebar/Sidebar'
import Home from './src/components/Home/Home';
import Projects from './src/components/Project/Projects'
import Tasks from './src/components/Task/Tasks';
import Comments from './src/components/Comment/Comments';
import Users from './src/components/User/Users';
import MyProjects from './src/components/Project/MyProjects';
import MyTasks from './src/components/Task/MyTasks';
import MyComments from './src/components/Comment/MyComments';
import Profile from './src/components/User/Profile';

export default class App extends Component {



  render() {
    const Drawer = createDrawerNavigator({
      Home: {
        screen: Home,
      },
      Projects: {
        screen: Projects,
      },
      Tasks: {
        screen: Tasks,
      },
      Comments: {
        screen: Comments,
      },
      Users: {
        screen: Users,
      },
      MyProjects: {
        screen: MyProjects,
      },
      MyTasks: {
        screen: MyTasks,
      },
      MyComments: {
        screen: MyComments,
      },
      Profile: {
        screen: Profile,
      }
    }, {
        contentComponent: Sidebar,
        drawerWidth: 250,
        drawerPosition: 'left',
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
      });

    return (
      <Drawer />
    );
  }
}