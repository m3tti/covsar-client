import { helper } from '@ember/component/helper';

export default helper(function formatNumber([num]) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
});
