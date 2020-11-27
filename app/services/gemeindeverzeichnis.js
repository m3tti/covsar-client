import csv from 'csvtojson';
import Service from '@ember/service';

export default class Gemeindeverzeichnis extends Service {
  path = "/resources/gemeindeverzeichnis.csv";

  async getJson() {
    var req = await fetch(this.path);
    
    if(req.status > 200) return {};

    var str = await req.text();

    return csv({ delimiter: "auto" }).fromString(str)
  }
}