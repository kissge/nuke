import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import Bar from '../components/Bar';
import Utility from '../utility';

moment.locale('ja');

@Component({
  components: { Bar },
})
export default class Home extends Vue {
  public categoryWise = [] as any[];
  public projectWise = [] as any[];
  public labels = [] as string[];
  public options = {
    legend: {
      position: 'bottom',
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          callback: (value: number) =>
            `${Math.floor(value / 60)}:${Utility.pad(value % 60)}`,
          stepSize: 5 * 60,
        },
      }],
    },
    tooltips: {
      callbacks: {
        label: (item: any, data: any) =>
          `${Math.floor(item.xLabel / 60)}:${Utility.pad(item.xLabel % 60)} ` +
          `${data.datasets[item.datasetIndex].label}`,
      },
    },
  };

  public categories: Array<{id: number, name: string}> = [];
  public projects: Array<{id: number, name: string}> = [];

  public mounted() {
    Promise.all([this.$axios.get('/api/category'),
                 this.$axios.get('/api/project'),
                 this.$axios.get('/api/stat/weekly')])
      .then(([{data: categories}, {data: projects}, {data: stats}]) => {
        this.categories = categories;
        this.projects = projects;

        const datasets: {[key: string]: {[id: number]: {[week: string]: number}}} = {
          categoryWise: {},
          projectWise: {},
        };

        this.categories.forEach(({id, name}) => {
          datasets.categoryWise[id] = {};
          this.categoryWise.push({
            label: name,
            backgroundColor: Utility.color(name),
            borderColor: '#ccc',
            borderWidth: 1,
            stack: 'stack',
            data: [],
          });
        });

        this.projects.forEach(({id, name}) => {
          datasets.projectWise[id] = {};
          this.projectWise.push({
            label: name,
            backgroundColor: Utility.color(name),
            borderColor: '#ccc',
            borderWidth: 1,
            stack: 'stack',
            data: [],
          });
        });

        stats.forEach(({projectId, categoryId, week, total}: {[key: string]: number}) => {
          total = Number(total);
          datasets.categoryWise[categoryId][week] = (datasets.categoryWise[categoryId][week] || 0) + Number(total);
          datasets.projectWise[projectId][week] = (datasets.projectWise[projectId][week] || 0) + Number(total);
        });

        for (let week = 6; week >= 0; --week) {
          const sunday = moment().subtract(week, 'weeks').day(0);
          const saturday = moment().subtract(week, 'weeks').day(6);
          this.labels.push(sunday.format('l') + '–' + saturday.format('DD'));
          this.categories.forEach(({id}, i) => {
            const total = datasets.categoryWise[id][sunday.format('YYYYW')] || 0;
            this.categoryWise[i].data.push(total);
          });
          this.projects.forEach(({id}, i) => {
            const total = datasets.projectWise[id][sunday.format('YYYYW')] || 0;
            this.projectWise[i].data.push(total);
          });
        }
      });
  }
}
