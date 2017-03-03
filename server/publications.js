Meteor.publish('all_todos', function () {
  return Todos.find({}, {
    fields: {
      title: 1
    }
  });
});

Meteor.publish('single_todo', function (id, options) {
  return Todos.find({_id: id}, {
    fields: {
      title: 1,
      subtitle: 1,
      subtasks: {$slice: options ? options.subtasks : 0}
    }
  });
});