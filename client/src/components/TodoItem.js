import React from "react";
//semantic ui
import { ListItem, ListContent, Button, Checkbox } from "semantic-ui-react";

const TodoItem = ({
  todo,
  handleTodoItemDelete,
  handleSelectTodoChange,
  selected,
}) => {
  return (
    <>
      <ListItem disabled={selected ? todo._id != selected : null}>
        <ListContent floated="right">
          <Button onClick={() => handleTodoItemDelete(todo._id)}>Delete</Button>
        </ListContent>
        <ListContent floated="left">
          <Checkbox
            onChange={(e, { checked }) => {
              handleSelectTodoChange(checked, todo._id);
            }}
            label={todo.action}
            checked={todo._id == selected}
          />
        </ListContent>
      </ListItem>
    </>
  );
};

export default TodoItem;
