import React from 'react';
import {
  Card,
  CardHeader,
  CardText,
  IconButton,
  TextField,
  DatePicker
} from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentSave from 'material-ui/svg-icons/content/save';
import {
  greenA200,
  red100
 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';
import { deleteTodo, saveTodo, completeTodo } from '../states/todo-actions'
import PropTypes from 'prop-types';

const titleStyle = {
  'textDecoration': 'line-through'
};

const cardStyle = {
  'backgroundColor': '#E1BEE7'
};

const dueStyle = {
  'backgroundColor': '#E6EE9C'
};

class TodoItem extends React.Component {
  static propTypes = {
    itemTitle: PropTypes.string,
    itemTask: PropTypes.string,
    itemDue: PropTypes.string,
    completed: PropTypes.bool,
    index: PropTypes.number,
    dispatch: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      completed: nextProps.completed,
      editable: false,
      title: nextProps.itemTitle,
      task: nextProps.itemTask,
      due: nextProps.itemDue
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed,
      editable: false,
      title: this.props.itemTitle,
      task: this.props.itemTask,
      due: this.props.itemDue
    };
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTitleOrTextChanged = this.handleTitleOrTextChanged.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.checkDue = this.checkDue.bind(this);
  }

  render() {
    let splited_task = this.state.task.split('\n');
    let renderCardStyle = (this.state.completed)? cardStyle : {};
    let dued = this.checkDue(this.state.due);
    if (!this.state.completed && dued)
      renderCardStyle = dueStyle;
    let renderTitleStyle = (this.state.completed)? titleStyle : {};
    return (
      <div className="todoItemWrapper">
        { (!this.state.editable) ? (
            <Card
              className="todoItem"
              onClick={this.handleCompleted}
              style={renderCardStyle}
            >
              <div className="cardHeader">
                <CardHeader
                  title={this.state.title}
                  subtitle={this.state.due}
                  titleStyle={renderTitleStyle}
                />
              </div>
              <CardText expandable={this.state.completed} style={{'display': 'flex', 'flexDirection': 'column'}}>{splited_task.map((line, index) => <span key={index}>{line}</span>)}</CardText>
            </Card>
          ) : (
            <Card className="todoItem">
                <TextField className="EditField" id="title" value={this.state.title} hintText={this.props.title} onChange={this.handleTitleOrTextChanged}/>
                <DatePicker className="EditField" id="due" value={new Date(this.state.due)} hintText={this.props.due} onChange={this.handleDateChanged}/>
                <TextField  className="EditField" id="task" value={this.state.task} multiLine={true} hintText={this.props.task} onChange={this.handleTitleOrTextChanged}></TextField>
            </Card>
          )
        }
        { !this.state.completed &&
          <div className="deleteButton">
            <IconButton onClick={this.handleDelete}>
              <ActionDelete hoverColor={greenA200}/>
            </IconButton>
            <IconButton onClick={this.handleEdit}>
              {(this.state.editable) ? (
                <ContentSave hoverColor={red100}/>
              ) : (
                <ContentCreate hoverColor={red100}/>
              )
              }
            </IconButton>
          </div>
        }
      </div>
    );
  }

  checkDue(due) {
    let dueDate = due.split('/');
    let nowDate = new Date();
    nowDate = nowDate.toLocaleDateString().split('/');
    var dued = false;
    if (Number(dueDate[0]) < Number(nowDate[0]))
      dued = true;
    else {
      if (Number(dueDate[0]) === Number(nowDate[0])) {
        if (Number(dueDate[1]) < Number(nowDate[1]))
          dued = true;
        else {
          if (Number(dueDate[1]) === Number(nowDate[1])) {
            if (Number(dueDate[2]) < Number(nowDate[2])) {
              dued = true;
            }
          }
        }
      }
    }
    return dued;
  }

  handleCompleted() {
    if (!this.state.completed) {
      this.setState({
        completed: true
      });
    } else {
      this.setState({
        completed: false
      });
    }
    this.props.dispatch(completeTodo(this.props.index))
  }

  handleDelete() {
    this.props.dispatch(deleteTodo(this.props.index));
  }

  handleEdit() {
    if (this.state.editable) {
      this.props.dispatch(saveTodo, {
        title: this.state.title,
        task: this.state.task,
        due: this.state.due
      }, this.props.index);
      this.setState({
        editable: !this.state.editable
      });
    } else {
      this.setState({
        editable: !this.state.editable
      });
    }
  }

  handleTitleOrTextChanged(e) {
    switch (e.target.id) {
      case 'title':
        this.setState({
          title: e.target.value
        });
        break;
      case 'task':
        this.setState({
          task: e.target.value
        });
        break;
      default:

    }
  }

  handleDateChanged(e, date) {
    this.setState({
      due: date.toLocaleDateString()
    })
  }
}

export default connect(state => ({

}))(TodoItem);
