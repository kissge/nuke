import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  public loginStatus = '?';

  public mounted() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api');
    xhr.onload = () => this.loginStatus = xhr.status === 200 ? xhr.responseText : 'Login';
    xhr.send();
  }
}
