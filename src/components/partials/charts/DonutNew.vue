<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    data() {
        return {
            isLoading: false,
            data: {
                datasets: [
                    {
                        backgroundColor: 'red',
                        data: [10, 20, 30]
                    }
                ],

                labels: ['Red', 'Yellow', 'Blue']
            },
            options: {}
        };
    },
    mounted() {
        this.renderChart(this.data);
    }
};
</script>

