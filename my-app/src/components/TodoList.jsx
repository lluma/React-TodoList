import React from 'react';
import TodoItem from './TodoItem';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { getTodos } from '../states/todo-actions'
import PropTypes from 'prop-types'


class TodoList extends React.Component {
  static propTypes = {
    category: PropTypes.string,
    todoList: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.renderTodoList = [];
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getTodos());
  }

  componentDidMount() {

  }


  render() {
    switch(this.props.category) {
      case 'undo':
        this.renderTodoList = this.handleChangeCategory(this.props.todoList, true);
        break;
      case 'completed':
        this.renderTodoList = this.handleChangeCategory(this.props.todoList, false);
        break;
      default:
        this.renderTodoList = this.props.todoList;
        break;
    }
    
    return (
      <Container className="todoList">
          {this.renderTodoList.map((item, index) =>
            <TodoItem itemTitle={item.title} itemTask={item.task} itemDue={item.due} completed={item.completed} key={index} index={index}></TodoItem>
          )}
      </Container>
    );
  }

  handleChangeCategory(todoList, undoOrCompleted) {
    return todoList.filter((item) => {
      return (undoOrCompleted)? !item.completed : item.completed;
    })
  }
}

export default connect(state => ({
  todoList: state.todos.todoList
}))(TodoList);
