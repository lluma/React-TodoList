const initTodosState = {
  todoList: [
            {
              title: 'Hello',
              task: 'my Todo\nDefault task',
              due: '2018/3/5',
              completed: true
            },
            {
              title: 'Tony GOGO',
              task: 'dance\nwith people.',
              due: '2018/2/29',
              completed: false
            },
            {
              title: 'SLEEP',
              task: 'Zzz.',
              due: '2018/3/8',
              completed: false
            },
            {
              title: 'Cooking',
              task: 'My daily lunch',
              due: '2018/3/10',
              completed: false
            },
            {
              title: 'Shopping',
              task: 'Go to Costco',
              due: '2018/3/16',
              completed: false
            },
            {
              title: 'Interview',
              task: 'Having an interview at Microsoft',
              due: '2018/4/5',
              completed: false
            },
            {
              title: 'Play Game',
              task: 'PLay LOL with friends',
              due: '2018/3/20',
              completed: false
            }
          ]
}

export default function todos(state = initTodosState, action) {
  switch (action.type) {
    case '@TODOS/ADD_TODO':
      console.log(action.todo);
      return {
        todoList: state.todoList.concat([action.todo])
      };
    case '@TODOS/DELETE_TODO':
      let newTodoList = state.todoList.filter((todo, key) => {
        return key !== action.index;
      });
      return {
        todoList: newTodoList
      };
    case '@TODOS/DELETE_COMPLETED_TODOS':
      let undoTodoList = state.todoList.filter((todo, key) => {
        return !todo.completed;
      });
      return {
        todoList: undoTodoList
      };
    case '@TODOS/GET_TODOS':
      return {
        todoList: state.todoList
      };
    case '@TODOS/SAVE_TODO':
      let oldTodoList = state.todoList;
      oldTodoList[action.index] = action.newTodo;
      return {
        todoList: oldTodoList
      };
    case '@TODOS/COMPLETE_TODO':
      let CompleteATodoTodoList = state.todoList;
      CompleteATodoTodoList[action.index].completed = !CompleteATodoTodoList[action.index].completed;
      return {
        todoList: CompleteATodoTodoList
      };
    default:
      return state;
  }
}

// const initTabsState = {
//   category: 'all'
// };
//
// export default function tabs(state = initTabsState, action) {
//   switch (action.type) {
//     case '@TABS/CHANGE_Tab':
//       return {
//         category: action.tab
//       };
//     default:
//       return state;
//   }
// };
