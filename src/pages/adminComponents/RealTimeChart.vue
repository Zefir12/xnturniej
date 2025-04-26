<template>
    <div class="ram-usage-container">
        <h2>RAM Usage Monitor</h2>
        <div class="chart-container">
            <canvas ref="chartRef"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'
import type { ChartData, ChartOptions, Chart as ChartType } from 'chart.js'

interface RAMUsageData {
    timestamp: string
    value: number
}

export default defineComponent({
    name: 'RAMUsageChart',
    setup() {
        const chartRef = ref<HTMLCanvasElement | null>(null)
        const chart = ref<ChartType | null>(null)
        let pollInterval: number | null = null

        // Chart data with TypeScript
        const chartData = reactive<ChartData<'line', number[], string>>({
            labels: [],
            datasets: [
                {
                    label: 'RAM Usage (MB)',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        })

        // Chart options with TypeScript
        const chartOptions: ChartOptions<'line'> = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Server RAM Usage Monitor',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    min: 0,
                    title: {
                        display: true,
                        text: 'Memory (MB)',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
            },
        }

        // Initialize chart
        const initChart = (): void => {
            if (!chartRef.value) return

            const ctx = chartRef.value.getContext('2d')
            if (!ctx) return

            chart.value = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: chartOptions,
            })
        }

        // Fetch RAM usage data from server
        const fetchRAMUsage = async (): Promise<void> => {
            try {
                // Replace with your actual server endpoint
                const response = await axios.get<RAMUsageData>('/api/ram-usage')
                const ramData = response.data

                // Update chart with new data
                updateChart(ramData)
            } catch (error) {
                console.error('Error fetching RAM usage data:', error)

                // For development/testing - add mock data if API fails
                updateChartWithMockData()
            }
        }

        // Update chart with data
        const updateChart = (ramData: RAMUsageData): void => {
            const timestamp = ramData.timestamp || new Date().toLocaleTimeString()
            const ramValue = ramData.value

            // Add new data point
            chartData.labels.push(timestamp)
            chartData.datasets[0].data.push(ramValue)

            // Keep only the last 10 data points
            if (chartData.labels.length > 10) {
                chartData.labels = chartData.labels.slice(-10)
                chartData.datasets[0].data = chartData.datasets[0].data.slice(-10)
            }

            // Update chart
            chart.value?.update()
        }

        // Generate mock data for testing
        const updateChartWithMockData = (): void => {
            const mockValue = Math.floor(Math.random() * 1000) + 500
            const timestamp = new Date().toLocaleTimeString()

            updateChart({ timestamp, value: mockValue })
        }

        // Start polling server for data
        const startPolling = (): void => {
            // Initial fetch
            fetchRAMUsage()

            // Set up polling interval (every 5 seconds)
            pollInterval = window.setInterval(() => {
                fetchRAMUsage()
            }, 5000)
        }

        // Stop polling when component is unmounted
        const stopPolling = (): void => {
            if (pollInterval !== null) {
                clearInterval(pollInterval)
                pollInterval = null
            }
        }

        // Lifecycle hooks
        onMounted(() => {
            initChart()
            startPolling()
        })

        onBeforeUnmount(() => {
            stopPolling()
            if (chart.value) {
                chart.value.destroy()
            }
        })

        return {
            chartRef,
        }
    },
})
</script>

<style scoped>
.ram-usage-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    max-width: 800px;
    margin: 0 auto;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.chart-container {
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    height: 400px;
}
</style>
