import moment from 'moment';

export default function disablePastDates(current: any) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}