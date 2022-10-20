import Constants from '../util/Constants';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Messager from '../screens/Messager';
const routes = [
  {
    component: Register,
    name: Constants.SCREENS.register,
    options: {headerShown: false},
  },
  {
    component: Login,
    name: Constants.SCREENS.login,
    options: {headerShown: false},
  },
  {
    component: Main,
    name: Constants.SCREENS.main,
    options: {headerShown: false},
  },
  {
    component: Messager,
    name: Constants.SCREENS.messager,
    options: {headerShown: true},
  },
];

export default routes;
