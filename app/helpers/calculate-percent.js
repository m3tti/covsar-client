import { helper } from '@ember/component/helper';

export default helper(function calculatePercent([total, percentile]) {

  return ((100 / total) * percentile).toFixed(2);
});
