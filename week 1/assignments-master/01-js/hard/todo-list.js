/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor()
  {
    this.todoarr =[];
  }
  add(todo) {
    this.todoarr.push(todo);
  }
  remove(indexOfTodo)
  {
    this.todoarr.splice(indexOfTodo,1);
  }
  update(index,updatedTodo)
  {
    if(index>=this.todoarr.length)
    {
    }
    else
    {
      this.todoarr[index]=updatedTodo;
    }
  }
  getAll()
  {
    return this.todoarr;
  }
  get(indexOfTodo)
  {
    if(indexOfTodo>=this.todoarr.length)
    {
      return null;
    }
    return this.todoarr[indexOfTodo];
  }
  clear()
  {
    this.todoarr=[]
  }

}

module.exports = Todo;
