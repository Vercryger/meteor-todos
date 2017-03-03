import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Todos.find().count() === 0) {
    let subtasks = [];

    for (var i = 0; i < 100; i++) {
      subtasks.push({title: `subtask_title_${i}`});
    }

    for (var i = 0; i < 100; i++) {
      Todos.insert({
        title: `todo_title_${i}`,
        subtitle: `todo_subtitle_${i}`,
        subtasks: subtasks.slice(0, Math.round(Math.random()*(subtasks.length-1)))
      });
    }
  }
});
