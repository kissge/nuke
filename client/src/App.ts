import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  public drawer = true;
  public items = [{
    icon: 'bubble_chart',
    title: 'Inspire',
  }];

  public logout() {
    location.href = '/auth/logout';
    return false;
  }
}
