import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { 
    loadTodos, 
    removeTodoRequest, 
    markTodoAsCompletedRequest 
} from '../../data/thunks'; 
import { 
    getTodos, 
    getTodosLoading,
    getCompleteTodos,
    getIncompleteTodos
} from '../../data/selectors'

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ 
    inCompleteTodos = [], 
    completedTodos = [],
    onRemovePressed, 
    onCompletedPressed, 
    isLoading, 
    startLoadingTodos 
}) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos ...</div>;

    const content =  (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {inCompleteTodos.map((todo, index) => <TodoListItem
                key={index}
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed:</h3>
            {completedTodos.map((todo, index) => <TodoListItem
                key={index}
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}    
        </ListWrapper>
    )

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: getTodos(state),
    completedTodos: getCompleteTodos(state),
    inCompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);