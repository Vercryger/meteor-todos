Router.route('/', {
  name: 'todos_route',
  controller: TodosController
});

Router.route('/todo/:_id', {
  name: 'todo_overview_route',
  controller: OverviewTodoController
});

Router.route('/todo/:_id/details', {
  name: 'todo_details_route',
  controller: DetailsTodoController
});