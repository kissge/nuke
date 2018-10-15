import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import moment from 'moment';
import Nekomimi from './nekomimi.vue';
import Utility from '../utility';

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

@Component({
  components: {Nekomimi},
})
export default class Category extends Vue {
  @State public user: any;

  public categories: Array<{id: number, name: string}> = [];
  public projects: Array<{id: number, name: string}> = [];
  public records: any[] = [];
  public items: Item[] = [];
  public modal = false;
  public month = moment().format('YYYY-MM');

  public selectedUser = null;
  public selectedUserId: number | null = null;
  public users = [];

  public color = (seed: number, type: number) => Utility.color(seed, type);

  public mounted() {
    this.$axios.get('/api/category')
      .then((res) => this.categories = res.data);
    this.$axios.get('/api/project')
      .then((res) => this.projects = res.data);

    const year = parseInt(this.$route.params.year, 10);
    const month = parseInt(this.$route.params.month, 10);
    if (1900 <= year && year <= 9999 && 1 <= month && month <= 12) {
      this.month = `${year}-${Utility.pad(month)}`;
    }

    this.selectedUserId = parseInt(this.$route.params.user, 10) || null;
    this.$axios.get('/api/admin/user')
      .then((res) => {
        this.users = res.data;
        this.selectedUser = this.user;

        for (const user of res.data) {
          if (user.id === this.selectedUserId) {
            this.selectedUser = user;
            break;
          }
        }
      })
      .catch((res) => {
        if (res.response.status === 403) {
          this.selectedUserId = null;
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      });

    this.load();
  }

  public load() {
    this.$axios.get(`/api/record/${this.month}/${this.selectedUserId || ''}`)
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

    if (item.project && !item.category) {
      const project = this.projectName(item.project);
      for (const {id, name} of this.categories) {
        if (name === project) {
          item.category = id;
          break;
        }
      }
    }

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
    return `${Utility.pad(Math.floor(duration / 60))}:${Utility.pad(duration % 60)}`;
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

  public updateQuery(user?: number) {
    this.$router.push({
      name: 'record',
      params: {
        year: this.month.substr(0, 4),
        month: this.month.slice(-2),
        user: String(user || this.selectedUserId),
      },
    });
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
          this.$store.dispatch('showSnack', '削除しました');
        })
        .catch((err) => this.$store.dispatch('showSnack', err.response.data.message));
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
      this.$store.dispatch('showSnack', '不備があります');
      return;
    }

    this.$axios.post('/api/record', payloads)
      .then((res) => {
        this.load();
        this.$store.dispatch('showSnack', '保存しました');
      })
      .catch((err) => this.$store.dispatch('showSnack', err.response.data.message));
  }

  public editable() {
    return this.selectedUserId === null || this.user.id === this.selectedUserId;
  }

  private isValid(item: Item) {
    return !!(item.duration.match(/^\d{2}:?\d{2}$/) &&
              item.title &&
              item.project &&
              item.category);
  }
}
