<script>
import {Doughnut} from 'vue-chartjs'
export default {
  extends: Doughnut,
  props:['chartData', 'chartOptions'],
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>