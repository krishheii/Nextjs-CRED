import history from '../history';
import {
    CREATE_USER,
    DELETE_USER,
    EDIT_USER
} from './type';

export const createUser = formValues => async dispatch => {
    dispatch({ type: CREATE_USER, payload: formValues });
    history.push('/');
};

export const deleteUser = key => async dispatch => {
    dispatch({ type: DELETE_USER, payload: key });
};

export const editUser = (value,key) => async dispatch => {
    dispatch({ type: EDIT_USER, payload: [key,value] });
};
