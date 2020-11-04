import React from "react";
//semantic ui
import { List } from "semantic-ui-react";
//components
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  handleTodoItemDelete,
  handleSelectTodoChange,
  selected,
}) => {
  if (!todos) return null;

  return (
    <List divided verticalAlign="middle">
      {todos &&
        todos.length > 0 &&
        todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            handleTodoItemDelete={(id) => handleTodoItemDelete(id)}
            handleSelectTodoChange={(checked, id) =>
              handleSelectTodoChange(checked, id)
            }
            key={index}
            selected={selected}
          />
        ))}
    </List>
  );
};

export default TodoList;
