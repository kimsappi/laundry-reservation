import axios from 'axios';
import * as config from '../config.json';

export const submitReservations = async (newReservations, cancelledReservations, cancelCode, me) => {
  const res = await axios.post(config.apiRootURL + 'reservations', {
    new: newReservations,
    cancel: cancelledReservations,
    cancelCode,
    owner: me
  });
  console.log(res.data);
  return res.data.reservations;
};

export const getReservations = async () => {
  try {
    const res = await axios.get(config.apiRootURL + 'reservations');
    return res.data.reservations;
  } catch(err) {
    console.error(err);
    return null;
  }
};
