import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  public binding() {
    return this.$vuetify.breakpoint.mdAndUp ? {} : { column: true };
  }
}
