import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.USERS_FETCH_START: {
      return {
        ...state,
        initial: false,
        loading: true,
      };
    }
    case T.USERS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.USERS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.USERS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.USERS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
}