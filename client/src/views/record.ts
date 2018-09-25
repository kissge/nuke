import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import ColorHash from 'color-hash';

moment.locale('ja');

interface Item {
  dow?: string;
  project?: number;
  category?: number;
  date?: string;
  duration: string;
  id?: number;
  title?: string;
  empty?: boolean;
  modified?: boolean;
  valid?: boolean;
}

@Component({})
export default class Category extends Vue {
  public categories: Array<{id: number, name: string}> = [];
  public projects: Array<{id: number, name: string}> = [];
  public records: any[] = [];
  public items: Item[] = [];
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
        const items: Item[] = [];
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
                date: yyyymmdd,
                duration: this.timeString(duration),
                id,
                title,
              });
            }

            items.push({
              date: yyyymmdd,
              duration: '0',
              empty: true,
            });
          } else {
            items.push({
              dow: date.format('dd'),
              date: yyyymmdd,
              duration: '0',
              empty: true,
            });
          }
        }

        this.items = items;

      });
  }

  public modify(item: Item) {
    item.modified = true;
    item.valid = this.isValid(item);

    if (item.empty) {
      item.empty = false;
      this.items.splice(this.items.indexOf(item) + 1, 0, {
        date: item.date,
        duration: '0',
        empty: true,
      });
    }

    this.$forceUpdate();
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

  public modifiedCount() {
    return this.items.filter((i) => i.modified).length;
  }

  public deleteItem(item: Item) {
    if (item.empty) {
      item.modified = false;
    } else if (!item.id) {
      this.items.splice(this.items.indexOf(item), 1);
    } else if (confirm('削除しますか？\nこの操作は元に戻せません。')) {
      this.$axios.delete(`/api/record/${item.id}`)
        .then((res) => {
          const index = this.items.indexOf(item);
          if (item.dow) {
            this.items[index + 1].dow = item.dow;
          }
          this.items.splice(index, 1);
          this.$store.commit('showSnack', '削除しました');
        })
        .catch((err) => this.$store.commit('showSnack', err.response.data.message));
    }

    this.$forceUpdate();
  }

  public save(record: any) {
    const payloads = this.items
      .filter((i) => i.modified)
      .map((r) => {
        const payload = {...r};
        const hh = payload.duration.substr(0, 2);
        const mm = payload.duration.slice(-2);
        payload.duration = String(parseInt(hh, 10) * 60 + parseInt(mm, 10));

        return payload;
      });

    if (payloads.some((r) => !r.valid)) {
      this.$store.commit('showSnack', '不備があります');
      return;
    }

    this.$axios.post('/api/record', payloads)
      .then((res) => {
        this.load();
        this.$store.commit('showSnack', '保存しました');
      })
      .catch((err) => this.$store.commit('showSnack', err.response.data.message));
  }

  private pad(n: number, len = 2) {
    const str = String(n);
    if (str.length < len) {
      return Array(len - str.length + 1).join('0') + str;
    } else {
      return str;
    }
  }

  private isValid(item: Item) {
    return !!(item.duration.match(/^\d{2}:?\d{2}$/) &&
              item.title &&
              item.project &&
              item.category);
  }
}
