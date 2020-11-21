import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class QueryIndexRoute extends Route {
  @inject diviData;

  queryParams = {
    sql: {
      refreshModel: true,
    }
  }

  async model(params) {
    if(params.sql && params.sql !== "") {
      console.log(params.sql)
      const data = await this.diviData.query(params.sql);
      return JSON.stringify(data, null, 2);
    }
  }
}