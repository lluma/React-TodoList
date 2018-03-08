import React from 'react';
import {
  TextField,
  DatePicker,
  RaisedButton,
  Dialog,
  FlatButton
} from 'material-ui'
import PropTypes from 'prop-types';
import {
  FloatingActionButton
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import { addTodo, deleteCompletedTodos } from '../states/todo-actions';
import { connect } from 'react-redux';

const style = {
  margin: 0,
  top: 'auto',
  right: 10,
  bottom: 10,
  left: 'auto',
  position: 'fixed',
  zIndex: 9999
};

class AddForm extends React.Component {
  static propTypes ={
    category: PropTypes.string,
    addOn: PropTypes.bool,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      task: '',
      due: '',
      addOn: false,
      deleteAlert: false
    };
    this.handleFloatingButonClicked = this.handleFloatingButonClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleDelete}
      />,
    ];

    return (
      <div>
        { this.state.addOn &&
          <div className="addForm">
          <h3 className="addForm-title" >New Todo</h3>
          <TextField hintText="Title" floatingLabelText="Title" id="title" onChange={this.handleInputChange}></TextField>
          <TextField hintText="Task" floatingLabelText="Task" id="task" multiLine={true} onChange={this.handleInputChange}></TextField>
          <DatePicker hintText="Due (YYYY-MM-DD)" floatingLabelText="Due" id="due" onChange={this.handleDateChange}></DatePicker>
          <br />
          <RaisedButton style={{width: '5%'}} label="Submit" primary={true} onClick={this.handleSubmit}/>
          <br />
          </div>
        }
        <FloatingActionButton style={style} zDepth={1} onClick={this.handleFloatingButonClicked}>
          { (this.props.category === 'all' || this.props.category === 'undo')? (
              <ContentAdd/>
            ) : (
              <ActionDeleteForever/>
            )
          }
        </FloatingActionButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.deleteAlert}
          onRequestClose={this.handleClose}
        >
          Do you want to delete all the completed todos ?
        </Dialog>
      </div>
    );
  }

  handleFloatingButonClicked() {
    if (this.props.category !== 'completed') {
      this.setState({
        addOn: !this.state.addOn
      });
    } else {
      this.setState({
        deleteAlert: true
      });
    }
  }

  handleClose() {
    this.setState({
      deleteAlert: false
    });

  }

  handleDelete() {
    this.handleClose();
    this.props.dispatch(deleteCompletedTodos());
  }

  handleSubmit() {
    console.log(this.state);
    this.props.dispatch(addTodo({
      title: this.state.title,
      task: this.state.task,
      due: this.state.due
    }));
    this.setState({
      addOn: !this.state.addOn
    });
  }

  handleInputChange(e) {
    switch(e.target.id) {
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
      break;
    }
  }

  handleDateChange(e, date) {
    this.setState({
      due: date.toLocaleDateString()
    })
  }
}

export default connect(state => ({

}))(AddForm)
