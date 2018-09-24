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
  public month = moment().format('YYYY-MM');

  private colorHash = new ColorHash({lightness: 0.7});

  public mounted() {
    this.$axios.get('/api/category')
      .then((res) => this.categories = res.data);
    this.$axios.get('/api/project')
      .then((res) => this.projects = res.data);

    const year = parseInt(this.$route.params.year, 10);
    const month = parseInt(this.$route.params.month, 10);
    if (1900 <= year && year <= 9999 && 1 <= month && month <= 12) {
      this.month = `${year}-${this.pad(month)}`;
    }

    this.load();
  }

  public load() {
    this.$axios.get(`/api/record/${this.month}`)
      .then((res) => {
        this.records = res.data;
        const items = [];
        let cursor = 0;

        for (const date = moment(this.month + '-01').startOf('month');
             date <= moment(this.month + '-01').endOf('month');
             date.add(1, 'day')) {
          const yyyymmdd = date.format('YYYY-MM-DD');

          if (cursor < this.records.length && this.records[cursor].date === yyyymmdd) {
            {
              const {project, category, duration, id, title} = this.records[cursor];
              items.push({
                dow: date.format('dd'),
                project: project.id,
                category: category.id,
                date: this.records[cursor].date,
                duration: this.timeString(duration),
                id,
                title,
              });
            }

            while (++cursor < this.records.length && this.records[cursor].date === yyyymmdd) {
              const {project, category, duration, id, title} = this.records[cursor];
              items.push({
                project: project.id,
                category: category.id,
                date: this.records[cursor].date,
                duration: this.timeString(duration),
                id,
                title,
              });
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

      });
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

  public save(record: any) {
    const payload = {...record};
    const hh = payload.duration.substr(0, 2);
    const mm = payload.duration.slice(-2);
    payload.duration = parseInt(hh, 10) * 60 + parseInt(mm, 10);
    this.$axios.post('/api/record', payload)
      .then((res) => this.load()) // TODO:
      .catch((err) => alert(err.response.data.message)); // TODO:
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
