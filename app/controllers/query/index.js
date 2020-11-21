import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class QueryIndexController extends Controller {
  queryParams = ["sql"];

  @tracked newSql = "";

  @action setSql(e) {
    this.newSql = e.target.value;
  }
}
