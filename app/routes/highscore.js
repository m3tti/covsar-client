import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class HighscoreRoute extends Route {
  @service diviData;

  async model() {
    const sql = `SELECT
    kreisname, 
    sum(betten_frei) as bettenFrei, 
    sum(betten_gesamt) as bettenGesamt,
    sum(betten_belegt) as bettenBelegt,  
    sum(faelle_covid_aktuell) as covid, 
    sum(faelle_covid_aktuell_beatmet) as covidBeatmet 
    FROM ? GROUP BY kreisname ORDER BY covid DESC`
    const data = await this.diviData.query(sql);

    const top10 = data.slice(0, 10)
    return top10;
  }
}
