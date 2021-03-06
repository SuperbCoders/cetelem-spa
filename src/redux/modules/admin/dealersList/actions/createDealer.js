import _omitBy from 'lodash/omitBy';

import {
  DEALERS_FETCH_START,
  DEALERS_FETCH_END,
  DEALERS_FETCH_ERROR,
  DEALERS_ITEM_CREATED,
} from '../types';

import { adminDealersRequests } from '../../../../../api';

export default function createDealer(values) {
  return async dispatch => {
    try {
      dispatch({ type: DEALERS_FETCH_START });

      const form = _omitBy(values, (value) => !value);
      const preparedForm = {
        legal_name: form.legal_name,
        trade_name: form.trade_name,
        official_dealer: Boolean(form.official_dealer),
        used_car_saling: Boolean(form.used_car_saling),
        dealer_group_id: form.dealer_group_id === '0' ? null : form.dealer_group_id,
        code: form.code,
        rate: form.rate,
        contact_infos_attributes: [{ "value_type": "phone", "value": form.phone }],
        address_attributes: {
          postcode: form.postcode,
          country: form.country,
          region: form.region,
          region_id: form.regionId,
          city: form.city,
          city_id: form.cityId,
          street: form.street,
          building: form.building,
          location: [form.locationX, form.locationY],
        },
      };

      const { error } = await adminDealersRequests.createDealer(preparedForm);

      if (error) {
        dispatch({ type: DEALERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALERS_ITEM_CREATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALERS_FETCH_ERROR,
        data: { message: 'Ошибка создания дилера' },
      });
    } finally {
      dispatch({ type: DEALERS_FETCH_END });
    }
  };
}
