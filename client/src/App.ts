import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({})
export default class App extends Vue {
  @State public user: any;
  @State public snackText?: string;
  public snack = false;

  public drawer = true;
  public items?: any[] = [];

  public mounted() {
    this.$axios.get('/api')
      .then((res) => this.$store.commit('login', res.data))
      .catch((err) => {
        if (err) {
          alert(err);
        } else {
          this.$store.commit('login', null);
        }
      });
  }

  @Watch('user')
  public manageNavigationItems(value: any, old: any) {
    if (!this.user) {
      // not logged in
      this.items = undefined;
    } else {
      this.items = [
        {
          icon: 'dashboard',
          title: 'ダッシュボード',
          path: '/',
        },
        {
          icon: 'list',
          title: '労働記録',
          path: '/record',
        },
        {
          icon: 'settings',
          title: '設定',
          path: '/settings',
        },
      ];

      if (this.user.isAdmin) {
        this.items = this.items.concat([
          {
            icon: 'dashboard',
            title: '集計',
            path: '/admin/dashboard',
            admin: true,
          },
          {
            icon: 'dvr',
            title: 'プロジェクト管理',
            path: '/admin/project',
            admin: true,
          },
          {
            icon: 'people',
            title: 'ユーザ管理',
            path: '/admin/user',
            admin: true,
          },
          {
            icon: 'category',
            title: '作業種別管理',
            path: '/admin/category',
            admin: true,
          },
        ]);
      }
    }
  }

  @Watch('snackText')
  public showSnack(value: any, old: any) {
    this.snack = true;
  }

  public logout() {
    location.href = '/nuke/auth/logout';
    return false;
  }
}
