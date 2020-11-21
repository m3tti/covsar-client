import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class KreisRoute extends Route {
  @service diviData;

  afterModel(model, transition) {
    const firstModel = model[0];

    if(firstModel) {
      this.transitionTo("kreis.details", firstModel);
    }
  }

  async model() {
    const sql = `SELECT DISTINCT kreisname from ? ORDER BY kreisname ASC`
    const data = await this.diviData.query(sql);

    return data.map(e => e.kreisname).filter(e => e !== "");
  }
}
