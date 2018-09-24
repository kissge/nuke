import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import ColorHash from 'color-hash';

moment.locale('ja');

@Component({})
export default class Category extends Vue {
  public categories: Array<{id: number, name: string}> = [];
  public projects: Array<{id: number, name: string}> = [];
  public records: any[] = [];
  public items: any[] = [];
  public modal = false;
  public month = '2018-09';

  private colorHash = new ColorHash({lightness: 0.7});

  public mounted() {
    this.load();

    const items = [];
    let cursor = 0;
    for (const date = moment().startOf('month'); date <= moment().endOf('month'); date.add(1, 'day')) {
      const yyyymmdd = date.format('YYYY-MM-DD');

      if (cursor < this.records.length && this.records[cursor].date === yyyymmdd) {
        items.push({
          dow: date.format('dd'),
          ...this.records[cursor],
        });

        while (++cursor < this.records.length && this.records[cursor].date === yyyymmdd) {
          items.push(this.records[cursor]);
        }

        items.push({});
      } else {
        items.push({
          dow: date.format('dd'),
          date: yyyymmdd,
        });
      }
    }

    this.items = items;
  }

  public load() {
    this.$axios.get('/api/category')
      .then((res) => this.categories = res.data);
    this.$axios.get('/api/project')
      .then((res) => this.projects = res.data);
  }

  public timeString(duration: number) {
    return `${this.pad(Math.floor(duration / 60))}:${this.pad(duration % 60)}`;
  }

  public categoryName(id: number) {
    for (const {id: cid, name} of this.categories) {
      if (id === cid) {
        return name;
      }
    }
  }

  public projectName(id: number) {
    for (const {id: pid, name} of this.projects) {
      if (id === pid) {
        return name;
      }
    }
  }

  public color(seed: number, type: number) {
    return typeof seed === typeof undefined ?
      '' :
      this.colorHash.hex(String(seed + type * 1000));
  }

  private pad(n: number, len = 2) {
    const str = String(n);
    if (str.length < len) {
      return Array(len - str.length + 1).join('0') + str;
    } else {
      return str;
    }
  }
}
