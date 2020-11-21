import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class BundeslandRoute extends Route {
  @service diviData;

  afterModel(model, transition) {
    const firstModel = model[0];

    if(firstModel) {
      this.transitionTo("bundesland.details", firstModel);
    }
  }

  async model() {
    const sql = `SELECT DISTINCT Bundesland from ? ORDER BY Bundesland ASC`
    const data = await this.diviData.query(sql);

    return data.map(e => e.Bundesland).filter(e => e !== "");
  }
}
