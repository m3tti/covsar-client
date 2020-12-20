import Service from '@ember/service';

export default class BevoelkerungService extends Service {
  path = "/resources/bevoelkerung.csv";

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
