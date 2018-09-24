import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Category extends Vue {
  public categories = [];
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
    this.$axios.get('/api/category')
      .then((res) => this.categories = res.data);
  }

  public editItem(item: {id?: number, name: string}) {
    this.edit = true;
    this.editTarget = {...item};
    this.editError = false;
  }

  public submit() {
    if ((this.$refs.edit as any).validate()) {
      this.$axios.post('/api/admin/category', this.editTarget)
        .then((res) => this.load())
        .catch((err) => this.editError = err.response.data.message);
    }
  }
}
