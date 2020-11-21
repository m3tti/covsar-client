import Service from '@ember/service';
import fetch from 'fetch';

export default class CovidDataService extends Service {
  async fetchGeneral() {
    if(!this.general) {
      const corsProxy = "https://cors-anywhere.herokuapp.com"
      const options = { headers: { 'origin': '*', 'x-requested-with': "bla" } };
      const req = await fetch(`${corsProxy}/https://rki-covid-api.now.sh/api/general`, options)
      const json = await req.json();

      this.general = json;
    }
    
    return this.general;
  }

  async fetchStates() {
    if(!this.states) {
      const corsProxy = "https://cors-anywhere.herokuapp.com"
      const options = { headers: { 'origin': '*', 'x-requested-with': "bla" } };
      const req = await fetch(`${corsProxy}/https://rki-covid-api.now.sh/api/states`, options)
      const json = await req.json();

      this.states = json;
    }
    return this.states;
  }

  async getStateData(state) {
    const stateData = await this.fetchStates();
    return stateData.states.find(e => e.name === state);
  }

  async fetchDistricts() {
    if(!this.districts) {
      const corsProxy = "https://cors-anywhere.herokuapp.com"
      const options = { headers: { 'origin': '*', 'x-requested-with': "bla" } };
      const req = await fetch(`${corsProxy}/https://rki-covid-api.now.sh/api/districts`, options)
      const json = await req.json();

      this.districts = json;
    }
    return this.districts;
  }

  async getDistrictData(district) {
    const districtData = await this.fetchDistricts();
    return districtData.districts.find(e => district.includes(e.name));
  }

  async getAll() {

  }
}
