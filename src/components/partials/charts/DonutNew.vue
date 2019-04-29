<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    // props: ['profileIds', 'network', 'type'],
    data() {
        return {
            isLoading: false,
            tagData: null,
            metricsOverTime: [],
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Topics Over Time'
                }
            }
        };
    },
    mounted() {
        this.renderChart(this.data);
    }
};
</script>

