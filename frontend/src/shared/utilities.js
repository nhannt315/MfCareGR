import moment from 'moment';

export const generateColor = () => {
  return '#' + Math.random().toString(16).substr(-6);
};


export const getDateTime = (src) => {
  moment.locale('vi');
  let dayDiff = moment().diff(src, 'days');
  if (dayDiff > 2){
    return moment(src).format('DD MMM YYYY');
  } else {
    return moment(src).fromNow();
  }
};