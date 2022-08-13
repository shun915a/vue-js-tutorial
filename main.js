// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  created() {
    this.todos = todoStorage.fetch()
  },
  data: {
    todos: [],
    options: [
      { value: -1, label: 'All' },
      { value: 0, label: 'WIP' },
      { value: 1, label: 'Completed' }
    ],

    current: -1
  },
  methods: {
    doAdd: function(event, value) {
      const comment = this.$refs.comment

      if (!comment.value.lentgh) {
        return
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })

      comment.value = ''
    },
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    doRemove: function(item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },

      deep: true
    }
  }
});
