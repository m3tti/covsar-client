import { format } from "date-fns";
import csv from 'csvtojson';
import alasql from 'alasql';
import Service, { inject } from '@ember/service';
import { fetch } from 'fetch';

export default class DiviData extends Service {
  @inject gemeindeverzeichnis; 
  bedData = null;

  async fetchBedData() {
    const corsProxy = "https://cors-anywhere.herokuapp.com"
    const url = `${corsProxy}/https://diviexchange.blob.core.windows.net/%24web/DIVI_Intensivregister_Auszug_pro_Landkreis.csv`;
    const options = { headers: { 'origin': '*', 'x-requested-with': "bla" } };
    const req = await fetch(url, options);
    
    if(req.status <= 200) {
      const str = await req.text();
      const rawDivi = await csv().fromString(str);
      return rawDivi;
    }

    return [];
  }

  async mergedBedData() {
    if(!this.bedData) {
      const bedData = await this.fetchBedData();
      const gemeindeRegister = await this.gemeindeverzeichnis.getJson();

      this.bedData = bedData.map((el) => this.extender(el, gemeindeRegister))
    }
    return this.bedData;
  }

  extender(el, gemeindeRegister) {
    const d = gemeindeRegister.filter(e => e.Amtl["Gemeindeschlüssel"].slice(0,5) === el.gemeindeschluessel);
    const first = d[0] || { Bundesland: "", Kreisname: "" }
    
    return {
      ...el,
      faelle_covid_aktuell: parseInt(el.faelle_covid_aktuell),
      faelle_covid_aktuell_beatmet: parseInt(el.faelle_covid_aktuell_beatmet),
      betten_frei: parseInt(el.betten_frei),
      betten_belegt: parseInt(el.betten_belegt),
      betten_gesamt: parseInt(el.betten_belegt) + parseInt(el.betten_frei), 
      Bundesland: first.Bundesland, 
      kreisname: first.Kreisname 
    }
  }

  async query(sqlQuery) {
    const mergedBedData = await this.mergedBedData();
    return alasql(sqlQuery, [mergedBedData]);
  }
}