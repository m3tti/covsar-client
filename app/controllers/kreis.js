import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from "@ember/object";

export default class KreisController extends Controller {
  @tracked filteredKreise = this.model;
  @tracked input;

  @action filter() {
    this.filteredKreise = this.model.filter(e => this.toLower(e).includes(this.toLower(this.input)));
  }

  toLower(str) {
    if(str) {
      return str.toLowerCase()
    }
    return str;
  }
}
