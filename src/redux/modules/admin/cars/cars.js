import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  reload: false,
  data: [],
  meta: {},
};

export default function reservationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.CARS_FETCH_START: {
      return {
        ...state,
        initial: false,
        reload: false,
        loading: true,
      };
    }
    case T.CARS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.CARS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.CARS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.CARS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data.list,
        meta: action.data.meta,
      };
    }
    case T.CARS_ITEM_CREATED:
    case T.CARS_ITEM_UPDATED:
    case T.CARS_ITEM_DELETED: {
      return {
        ...state,
        reload: true,
      };
    }
    default: {
      return state;
    }
  }
}
