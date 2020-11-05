import React, { useEffect, useState } from "react";
//semantic ui
import {
  Input,
  Button,
  Container,
  FormField,
  Header,
  Loader,
} from "semantic-ui-react";
//components
import TodoList from "./TodoList";
//services
import todoservice from "../services/todoservice";
//css
import "./Todo.css";

const Todo = () => {
  const [actions, setActions] = useState([]);
  const [action, setAction] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const addEditTodo = () => {
    if (action && action.length > 0) {
      if (todoToEdit) {
        todoservice
          .updateTodo(todoToEdit._id, action)
          .then((res) => {
            getTodos();
            setAction("");
            setTodoToEdit(null);
          })
          .catch((err) => console.log(err));
      } else {
        todoservice
          .createTodo(action)
          .then((res) => {
            getTodos();
            setAction("");
          })
          .catch((err) => console.log(err));
      }
    } else {
      console.log("input field required");
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      addEditTodo();
    }
  };

  const getTodos = () => {
    setLoading(true);
    setTimeout(() => {
      todoservice
        .getAllTodos()
        .then((response) => {
          setActions(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, 200);
  };

  const handleTodoItemDelete = (id) => {
    todoservice
      .deleteTodo(id)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  };

  const handleEditTodo = (checked, id) => {
    if (checked) {
      const todo = actions.find((todo) => todo._id === id);
      if (todo) {
        setTodoToEdit(todo);
        setAction(todo.action);
      }
    } else {
      setAction("");
      setTodoToEdit(null);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return (
      <div className="todo-loader">
        <Loader active inline="centered" />
      </div>
    );
  }

  return (
    <>
      <header className="todo-header">
        <Header as="h1">My Todo(s)</Header>
      </header>
      <main>
        <div className="todo-top-inputs">
          <FormField>
            <Input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="New todo.."
              onKeyDown={onKeyPress}
            />
            <Button
              className="todo-add-button"
              onClick={addEditTodo}
              disabled={action === ""}
            >
              {todoToEdit ? "Update" : "Add"}
            </Button>
          </FormField>
        </div>
        <p>Check to update</p>
        <Container className="todo-container">
          {actions.length == 0 ? (
            <h5>No todos</h5>
          ) : (
            <TodoList
              todos={actions}
              handleTodoItemDelete={(id) => {
                handleTodoItemDelete(id);
              }}
              handleSelectTodoChange={(checked, id) =>
                handleEditTodo(checked, id)
              }
              selected={todoToEdit ? todoToEdit._id : null}
            />
          )}
        </Container>
      </main>
      <footer>
        <p>Bertoni Test by Marcelo Arias</p>
      </footer>
    </>
  );
};

export default Todo;
