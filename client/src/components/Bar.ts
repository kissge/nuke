import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import VueCharts from 'vue-chartjs';

@Component
export default class Bar extends Mixins(VueCharts.HorizontalBar, VueCharts.mixins.reactiveProp) {
  @Prop() public chartData: any;
  @Prop() public options: any;

  public mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
