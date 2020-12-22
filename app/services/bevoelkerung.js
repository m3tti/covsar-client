import Service from '@ember/service';

export default class BevoelkerungService extends Service {
  path = "/resources/bevoelkerung.csv";
  bundeslandCode = {
    "01": "Schleswig-Holstein",
    "02": "Freie und Hansestadt Hamburg",
    "03": "Niedersachsen",
    "04": "Freie Hansestadt Bremen",
    "05": "Nordrhein-Westfalen",
    "06": "Hessen",
    "07": "Rheinland-Pfalz",
    "08": "Baden-Württemberg",
    "09": "Bayern",
    "10": "Saarland",
    "11": "Berlin",
    "12": "Brandenburg",
    "13": "Mecklenburg-Vorpommern",
    "14": "Freistaat Sachsen",
    "15": "Sachsen-Anhalt",
    "16": "Freistaat Thüringen",
  };

  async getJson() {
    var req = await fetch(this.path);
    
    if(req.status > 200) return {};

    var str = await req.text();
    
    var json = this.genJson(str);
    return json;
  }

  async getForKreis(kreis) {
    const vals = await this.getJson();
    return vals.find(e => {
      if(e.kreisName) {
        return e.kreisName.includes(kreis.split(",")[0])
      }
      return false;
    });
  }

  async getForBundesland(bundesland) {
    const bundeslandKey = this.getKeyForBundesland(bundesland);
    const vals = await this.getJson();
    const landkreiseInBundesland = vals.filter(e => {
      if(e.kreis) {
        return e.kreis.substring(0, 2) === bundeslandKey
      }
      return false;
    });

    return landkreiseInBundesland.map(e => e.bevoelkerung).reduce(this.sum, 0);
  }

  getKeyForBundesland(bundesland) {
    let res = "";
    Object.keys(this.bundeslandCode).forEach(key => {
      if(this.bundeslandCode[key] === bundesland) {
        res = key;
      }
    })
    return res;
  }

  async getTotal() {
    const vals = await this.getJson();
    return vals.map(e => e.bevoelkerung).reduce(this.sum, 0);
  }

  genJson(str) {
    const result = [];
    const lines = str.split("\n");

    lines.map(line => {
      const fields = line.split(";");
      const [date, kreis, kreisName, ...values] = fields;
      let totalValues = 0;

      if (Array.isArray(values)) {
        totalValues = values.reduce(this.sum, 0);
        if(isNaN(totalValues)) {
          totalValues = 0;
        }
      }

      result.push({
        date,
        kreis,
        kreisName,
        bevoelkerung: totalValues,
      });
    })

    return result;
  }

  sum(val, acc) {
    try {
      acc = parseInt(acc)
      val = parseInt(val);
      acc+=val
    } catch(e) {}

    return acc;
  }
}
