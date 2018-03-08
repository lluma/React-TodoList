// todos's actions
export function addTodo(todo) {
  return {
    type: '@TODOS/ADD_TODO',
    todo
  };
}

export function deleteTodo(index) {
  return {
    type: '@TODOS/DELETE_TODO',
    index
  };
}

export function deleteCompletedTodos() {
  return {
    type: '@TODOS/DELETE_COMPLETED_TODOS'
  };
}

export function getTodos() {
  return {
    type: '@TODOS/GET_TODOS'
  };
}

export function saveTodo(newTodo, index) {
  return {
    type: '@TODOS/SAVE_TODO',
    newTodo,
    index
  };
}

export function completeTodo(index) {
  return {
    type: '@TODOS/COMPLETE_TODO',
    index
  };
}

// tabs's actions
// export function changeTab(tab) {
//   retrun {
//     type: '@TABS/CHANGE_Tab',
//     tab
//   };
// }
