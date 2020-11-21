import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service diviData;
  @service covidData;

  async model() {
    const covid = await this.diviData.query("SELECT sum(faelle_covid_aktuell) FROM ?");
    const covidBeatmet = await this.diviData.query("SELECT sum(faelle_covid_aktuell_beatmet) FROM ?");
    const bettenGesamt = await this.diviData.query("SELECT sum(betten_gesamt) FROM ?");
    const bettenFrei = await this.diviData.query("SELECT sum(betten_frei) FROM ?");
    const bettenBelegt = await this.diviData.query("SELECT sum(betten_belegt) FROM ?");
    const bundesland = await this.diviData.query("SELECT DISTINCT Bundesland FROM ?")
    const covidGeneral = await this.covidData.fetchGeneral();

    return {
      covid: this.getFirst(covid),
      covidBeatmet: this.getFirst(covidBeatmet),
      bettenGesamt: this.getFirst(bettenGesamt),
      bettenFrei: this.getFirst(bettenFrei),
      bettenBelegt: this.getFirst(bettenBelegt),
      bundesland: bundesland.map(e => e.Bundesland),
      ...covidGeneral,
    };
  }  

  getFirst(array) {
    return Object.values(array[0])[0];
  }
}
