import {
  STATISTICS_FETCH_START,
  STATISTICS_FETCH_END,
  STATISTICS_FETCH_ERROR,
  STATISTICS_LIST_LOADED,
} from '../types';

import { dealerStatisticsRequests } from '../../../../../api';

import { DEALER_ID_KEY } from '../../../../../constants';

export default function getStatistics() {
  return async dispatch => {
    try {
      dispatch({ type: STATISTICS_FETCH_START });

      const id = localStorage.getItem(DEALER_ID_KEY);
      const { error, data } = await dealerStatisticsRequests.getStatistics(id);

      if (error) {
        dispatch({ type: STATISTICS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: STATISTICS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: STATISTICS_FETCH_ERROR,
        data: { message: 'Ошибка получения статистики' },
      });
    } finally {
      dispatch({ type: STATISTICS_FETCH_END });
    }
  };
}
