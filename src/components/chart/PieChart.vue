<script>
import {Pie} from 'vue-chartjs'
export default {
  extends: Pie,
  props:['chartData', 'chartOptions'],
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>