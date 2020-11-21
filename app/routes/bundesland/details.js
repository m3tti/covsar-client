import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class BundeslandDetailsRoute extends Route {
  @service diviData;
  @service covidData;
  
  async model(params) {
    const sql = `SELECT 
    sum(betten_frei) as bettenFrei, 
    sum(betten_gesamt) as bettenGesamt,
    sum(betten_belegt) as bettenBelegt,  
    sum(faelle_covid_aktuell) as covid, 
    sum(faelle_covid_aktuell_beatmet) as covidBeatmet 
    FROM ? WHERE Bundesland = "${params.bundesland}"
    `
    const data = await this.diviData.query(sql);
    const covid = await this.covidData.getStateData(params.bundesland);
    return {
      ...data[0],
      ...covid,
      bundesland: params.bundesland,
    }
  }
}
