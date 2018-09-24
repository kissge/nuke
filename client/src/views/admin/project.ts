import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Project extends Vue {
  public projects = [];
  public headers = [
    {
      text: '#',
      value: 'id',
      align: 'right',
    },
    {
      text: '名前',
      value: 'name',
    },
    {
      sortable: false,
    },
  ];

  public edit = false;
  public editTarget: {id?: number, name: string} = {name: ''};
  public editError: string | false = false;
  public valid = false;

  public mounted() {
    this.load();
  }

  public load() {
    this.edit = false;
    this.$axios.get('/api/project')
      .then((res) => this.projects = res.data);
  }

  public editItem(item: {id?: number, name: string}) {
    this.edit = true;
    this.editTarget = {...item};
    this.editError = false;
  }

  public submit() {
    if ((this.$refs.edit as any).validate()) {
      this.$axios.post('/api/admin/project', this.editTarget)
        .then((res) => this.load())
        .catch((err) => this.editError = err.response.data.message);
    }
  }
}
