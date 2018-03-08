import React, { Component } from 'react';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';
import {
  AppBar,
  IconMenu,
  MenuItem,
  IconButton
} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import todos from './states/todo-reducers';

import './App.css';

const style = {
  visibility: 'hidden'
}

class App extends Component {
  constructor(props) {
      super(props);
      this.store = null;
      this.active = 'all';
      this.state = {
        category: 'all',
        show: true
      };
      this.handleNav = this.handleNav.bind(this);
      this.handleNavInBar = this.handleNavInBar.bind(this);
      this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentWillMount() {
    const composeEnhancers = window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(combineReducers({
      todos
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    if (document.body.clientWidth <= 480 && this.state.show) {
      this.setState({
        show: false
      });
    } else if(document.body.clientWidth > 480 && !this.state.show) {
      this.setState({
        show: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Provider store={this.store}>
          <MuiThemeProvider>
            <div>
              <AppBar title={
                <div className="mynav">
                  <span>TODO LIST</span>&nbsp;&nbsp;&nbsp;
                  <a className="all active" onClick={this.handleNav} href="#" style={(this.state.show)? {} : style}>ALL</a>&nbsp;&nbsp;
                  <a className="undo" onClick={this.handleNav} href="#" style={(this.state.show)? {} : style}>UNDO</a>&nbsp;&nbsp;
                  <a className="completed" onClick={this.handleNav} href="#" style={(this.state.show)? {} : style}>COMPLETED</a>
                </div>
              }
              showMenuIconButton={!this.state.show}
              onLeftIconButtonClick={() => {}}
              iconElementLeft={
                <div>
                  <IconMenu
                    iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  >
                    <MenuItem primaryText="ALL" checked={(this.state.category === 'all')} onClick={() => this.handleNavInBar('all')} />
                    <MenuItem primaryText="UNDO" checked={(this.state.category === 'undo')} onClick={() => this.handleNavInBar('undo')} />
                    <MenuItem primaryText="COMPLETED" checked={(this.state.category === 'completed')} onClick={() => this.handleNavInBar('completed')} />
                  </IconMenu>
                </div>
              }
              >
              </AppBar>
              <AddForm category={this.state.category}></AddForm>
              <TodoList category={this.state.category}></TodoList>
            </div>
          </MuiThemeProvider>
        </Provider>
      </div>
    );
  }

  handleNav(e) {
    var newActive;
    if (e.target.className.indexOf('all') !== -1) {
      newActive = 'all';
      document.querySelector(`.${newActive}`).className += ' active';
    }
    else if (e.target.className.indexOf('undo') !== -1) {
      newActive = 'undo';
      document.querySelector(`.${newActive}`).className += ' active';
    } else if (e.target.className.indexOf('completed') !== -1) {
      newActive = 'completed';
      document.querySelector(`.${newActive}`).className += ' active';
    }
    document.querySelector(`.${this.active}`).className = this.active;
    this.active = newActive;
    this.setState({
      category: newActive
    });
  }

  handleNavInBar(category) {
    this.setState({
      category: category
    });
    document.querySelector(`.${category}`).className += ' active';
    document.querySelector(`.${this.active}`).className = this.active;
    this.active = category;
  }
}

export default App;
