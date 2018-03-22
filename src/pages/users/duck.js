import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../../api';

// Action Types
const TOGGLE_EDIT_MODAL = 'USER/TOGGLE_EDIT_MODAL';
const TOGGLE_ADD_MODAL = 'USER/TOGGLE_ADD_MODAL';
const TOGGLE_DELETE_MODAL = 'USER/TOGGLE_DELETE_MODAL';

const GET_USERS = 'USER/GET_USERS';
const GET_USER = 'USER/GET_USER';
const ADD_USER = 'USER/ADD_USER';
const EDIT_USER = 'USER/EDIT_USER';

export const toggleEditModal = () => ({
  type: TOGGLE_EDIT_MODAL,
});

export const toggleAddModal = () => ({
  type: TOGGLE_ADD_MODAL,
});

export const toggleDeleteModal = () => ({
  type: TOGGLE_DELETE_MODAL,
});

export const getUsers = () => {
  return dispatch => {
    return dispatch({
      type: GET_USERS,
      promise: Api.getUsers(),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting users.',
          });
        },
      },
    });
  };
};

export const getUser = user => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: GET_USER,
      promise: Api.getUser(userID),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error fetching user information.',
          });
        },
      },
    });
  };
};

export const addUser = user => {
  return dispatch => {
    return dispatch({
      type: ADD_USER,
      promise: Api.addUser(user),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully created user.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while creating user.',
          });
        },
      },
    });
  };
};

export const editUser = (user, body) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: EDIT_USER,
      promise: Api.editUser(userID, body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Succesfully updated user.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating user.',
          });
        },
      },
    });
  };
};

const initialState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,

  isGettingUsers: false,
  isGettingUser: false,
  isAddingUser: false,
  isEditingUser: false,

  users: [],
  user: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
      };

    case TOGGLE_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: !state.isAddModalOpen,
      };

    case TOGGLE_DELETE_MODAL:
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
      };

    case GET_USERS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUsers: true,
        }),
        success: prevState => ({
          ...prevState,
          users: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingUsers: false,
        }),
      });

    case GET_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data[0],
        }),
        finish: prevState => ({
          ...prevState,
          isGettingUser: true,
        }),
      });

    case ADD_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: [...state.users, payload.data.data[0]],
          isAddModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingUser: false,
        }),
      });

    case EDIT_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: prevState.users.map(
            user =>
              user.userID === payload.data.data.userID
                ? { ...payload.data.data }
                : user,
          ),
          isEditModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingUser: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
