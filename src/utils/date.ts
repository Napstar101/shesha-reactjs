import moment from 'moment';
import { getSafelyTrimmedString } from './index';

/**
 * Checks if the date provided is within the date range
 * @param {string} dateFrom - the minimum date
 * @param {string} dateTo - the maximum date
 * @param {string} dateToCompare - the date to compare
 */
export const isDateBetween = (dateFrom: string, dateTo: string, dateToCompare: string) => {
  if (!getSafelyTrimmedString(dateFrom) || !getSafelyTrimmedString(dateTo) || !getSafelyTrimmedString(dateToCompare))
    return false;
  let lDate = new Date();
  lDate = new Date();
  lDate.setDate(lDate.getDate() + 7); // lastdate

  if (Date.parse(dateToCompare) <= Date.parse(dateTo) && Date.parse(dateToCompare) >= Date.parse(dateFrom)) {
    return true;
  }

  return false;
};

/**
 *
 * @param dateString
 */
export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

/**
 * Convert date from ISO format to `YYYY/MM/DD HH:mm:ss`
 * @param date - date in `YYYY/MM/DD HH:mm:ss` format
 * @returns date in `YYYY/MM/DD HH:mm:ss` or an empty string if the date passed was in the wrong format
 */
export const formattedDate = (date: string) => {
  try {
    const _date = new Date(date);

    return moment(_date).format('YYYY/MM/DD HH:mm');
  } catch (error) {
    return '';
  }
};

export const shortDob = (date: string) => {
  try {
    const _date = new Date(date);

    return moment(_date).format('YYYY/MM/DD');
  } catch (error) {
    return '';
  }
};

export const LongDob = (date: string) => {
  try {
    const _date = new Date(date);

    return moment(_date).format('DD MMM YYYY');
  } catch (error) {
    return '';
  }
};

export const tolocalIsoDate = (dateIsoString: string) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(Date.parse(dateIsoString) - tzoffset).toISOString().slice(0, -1);
};
