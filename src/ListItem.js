import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item text-dark text-center">
    <button className="mr-2 btn-sm btn btn-info" onClick= {props.editTodo}>U</button>
        {props.item.name}
    <button className="ml-2 btn-sm btn btn-danger" onClick= {props.deleteTodo}>X</button>
    </li>;
}

export default ListItem;