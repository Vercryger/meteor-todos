subs = new SubsManager({
  // any subscription will be expire after 5 minute, if it's not subscribed again
  expireIn: 15
});

MainController = RouteController.extend({
  layoutTemplate: 'layout',
  data: function() {
    var self = this;
    return {};
  }
});

TodosController = MainController.extend({
  template: 'my_todos',
  subscriptions: function () {
    return subs.subscribe('all_todos')
  },
  data: function () {
    return {
      todos: Todos.find()
    }
  }
});

OverviewTodoController = MainController.extend({
  template: 'todo_overview',
  subscriptions: function () {
    return subs.subscribe('single_todo', this.params._id);
  },
  data: function () {
    return {
      todo: Todos.findOne(this.params._id, {fields: {
        title: 1,
        subtitle: 1,
        subtasks: 1
      }})
    }
  }
});

DetailsTodoController = MainController.extend({
  template: 'todo_details',
  increment: {
    subtasks: 10
  },
  subscriptions: function () {
    return subs.subscribe('single_todo', this.params._id, {
      subtasks: this.queryLimit('subtasks')
    });
  },
  queryLimit: function (key) {
    return parseInt(this.params.query[key] || this.increment[key])
  },
  getTodo: function () {
    return Todos.findOne(this.params._id)
  },
  data: function () {
    const self = this;

    return {
      todo: self.getTodo(),
      loadMore: function () {
        try {
          if (self.getTodo().subtasks.length === self.queryLimit('subtasks'))
            return Router.routes['todo_details_route'].path({_id: self.params._id}, {query: `subtasks=${self.queryLimit('subtasks')+self.increment['subtasks']}`});
        } catch (e) {}
      }
    }
  }
});