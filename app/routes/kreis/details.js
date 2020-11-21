import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class KreisDetailsRoute extends Route {
  @service diviData;
  @service covidData;

  async model(params) {
    const sql = `SELECT 
    sum(betten_frei) as bettenFrei, 
    sum(betten_gesamt) as bettenGesamt,
    sum(betten_belegt) as bettenBelegt,  
    sum(faelle_covid_aktuell) as covid, 
    sum(faelle_covid_aktuell_beatmet) as covidBeatmet 
    FROM ? WHERE kreisname = "${params.kreisname}"`
    const data = await this.diviData.query(sql);
    const covid = await this.covidData.getDistrictData(params.kreisname);

    return {
      kreisname: params.kreisname,
      ...data[0],
      ...covid,
    }
  }
}
