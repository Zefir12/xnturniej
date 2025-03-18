<template>
    <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type PropType, onBeforeMount } from 'vue'
import { Chart, registerables, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns' // Required for time scale to work properly

Chart.register(...registerables)

// Define types
interface EloDataPoint {
    elo: number
    date: string | Date // ISO date string or Date object
}

interface Dataset {
    label: string
    backgroundColor: string
    borderColor: string
    borderWidth: number
    pointBackgroundColor: string
    tension: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    avatar?: string | any
    data: EloDataPoint[]
}

interface ProcessedDataset {
    label: string
    backgroundColor: string
    borderColor: string
    borderWidth: number
    pointBackgroundColor: string
    tension: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    avatar?: string | any
    data: { x: Date; y: number }[] // Time series format expected by Chart.js
}

// Define props
const props = defineProps({
    datasets: {
        type: Array as PropType<Dataset[]>,
        required: true,
    },
    chartOptions: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: Object as PropType<any>,
        default: () => ({}),
    },
})

// Refs
const chartCanvas = ref<HTMLCanvasElement | null>(null)
const chart = ref<Chart | null>(null)
const loadedAvatars = ref<Record<number, HTMLImageElement>>({})

// Process the data into the format expected by Chart.js time scale
const processData = (datasets: Dataset[]): ProcessedDataset[] => {
    return datasets.map((dataset) => {
        // Convert to format needed by Chart.js time scale
        const processedData = dataset.data.map((point) => ({
            x: point.date instanceof Date ? point.date : new Date(point.date),
            y: point.elo,
        }))

        // Sort by date ascending
        processedData.sort((a, b) => a.x.getTime() - b.x.getTime())

        return {
            ...dataset,
            data: processedData,
        }
    })
}

// Load all avatars before rendering
const preloadAvatars = () => {
    const promises: Promise<void>[] = []

    props.datasets.forEach((dataset, index) => {
        if (dataset.avatar) {
            promises.push(
                new Promise<void>((resolve) => {
                    const img = new Image()

                    if (typeof dataset.avatar === 'string') {
                        img.src = dataset.avatar
                    } else if (dataset.avatar && typeof dataset.avatar === 'object') {
                        img.src = dataset.avatar.default || dataset.avatar
                    }

                    img.onload = () => {
                        loadedAvatars.value[index] = img
                        resolve()
                    }

                    img.onerror = () => {
                        console.error(`Failed to load avatar for dataset ${index}`)
                        resolve()
                    }

                    // If already loaded
                    if (img.complete) {
                        loadedAvatars.value[index] = img
                        resolve()
                    }
                }),
            )
        }
    })

    return Promise.all(promises)
}

const renderChart = async () => {
    if (!chartCanvas.value) return

    // Make sure all avatars are loaded
    await preloadAvatars()

    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    // Destroy previous chart instance if it exists
    if (chart.value) {
        chart.value.destroy()
    }

    // Process the data for time scale
    const processedDatasets = processData(props.datasets)

    // Create custom plugin for avatars at last data points
    const avatarPlugin = {
        id: 'avatarPlugin',
        afterDatasetsDraw: (chart: Chart) => {
            const ctx = chart.ctx // You need to get the drawing context
            if (!ctx) return

            // For each dataset (line)
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                // Skip if no avatar for this dataset
                if (!loadedAvatars.value[datasetIndex]) return

                // Get the last visible point
                const meta = chart.getDatasetMeta(datasetIndex)
                if (!meta.hidden && meta.data.length > 0) {
                    const lastPointIndex = meta.data.length - 1
                    const lastPoint = meta.data[lastPointIndex]

                    if (lastPoint) {
                        const x = lastPoint.x
                        const y = lastPoint.y

                        // Draw border (larger circle)
                        const borderSize = 32 // Size of the border circle
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(x, y, borderSize / 2, 0, Math.PI * 2, true) // Draw the circle
                        ctx.closePath()
                        ctx.lineWidth = 5 // Set border thickness
                        ctx.strokeStyle = dataset.borderColor || 'rgba(0, 0, 0, 1)' // Use the dataset border color or default black
                        ctx.stroke() // Apply the stroke (border)
                        ctx.restore()

                        // Draw avatar
                        const avatarSize = 30 // Size of the avatar image
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(x, y, avatarSize / 2, 0, Math.PI * 2, true)
                        ctx.closePath()
                        ctx.clip() // Clip the area where the avatar will be drawn
                        ctx.drawImage(
                            loadedAvatars.value[datasetIndex],
                            x - avatarSize / 2,
                            y - avatarSize / 2,
                            avatarSize,
                            avatarSize,
                        )
                        ctx.restore()
                    }
                }
            })
        },
    }

    const delayBetweenPoints = 10
    const previousY = (ctx) => {
        if (ctx.index === 0) {
            return ctx.chart.scales.y.getPixelForValue(100)
        }

        const previousPoint = ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1]
        // Check if the previous point exists and has the getProps method
        if (previousPoint && typeof previousPoint.getProps === 'function') {
            return previousPoint.getProps(['y'], true).y
        }

        // Fallback to a default value if the previous point isn't available
        return ctx.chart.scales.y.getPixelForValue(100)
    }
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration(ctx) {
                // Get total points in this dataset
                const totalPoints = ctx.chart.getDatasetMeta(ctx.datasetIndex).data.length
                // Base delay value divided by the ratio of points
                // Using a minimum to prevent extremely slow animations for very small datasets
                return 1
            },
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0
                }
                ctx.xStarted = true

                // Get total points in this dataset
                const totalPoints = ctx.chart.getDatasetMeta(ctx.datasetIndex).data.length
                // Calculate delay based on index and total points
                const baseDelay = 10 / totalPoints
                return ctx.index * baseDelay
            },
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration(ctx) {
                // Get total points in this dataset
                const totalPoints = ctx.chart.getDatasetMeta(ctx.datasetIndex).data.length
                // Base delay value divided by the ratio of points
                return 1
            },
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0
                }
                ctx.yStarted = true

                // Get total points in this dataset
                const totalPoints = ctx.chart.getDatasetMeta(ctx.datasetIndex).data.length

                // Calculate delay based on index and total points
                const baseDelay = 10 / totalPoints
                return ctx.index * baseDelay
            },
        },
    }

    // Default options for time scale
    const defaultOptions = {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Display hourly
                    stepSize: 1, // 1 hour per tick
                    displayFormats: {
                        hour: 'MMM d', // 24-hour format (e.g., Mar 15, 14:30)
                    },
                    tooltipFormat: 'MMM d, HH:mm', // 24-hour format in tooltip
                },
                ticks: {
                    source: 'auto', // Automatically calculate ticks for better display
                },
                title: {
                    display: false,
                    text: 'Data',
                },
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Ranking',
                },
            },
        },
        elements: {
            line: {
                tension: 0.2, // For cubic interpolation
            },
            point: {
                radius: 1,
                hoverRadius: 16,
                hitRadius: 26,
            },
        },
        interaction: {
            intersect: true,
            mode: 'nearest',
        },
    }

    // Merge default options with user provided options
    const chartOptions = { ...defaultOptions, ...props.chartOptions }

    // Create new chart
    chart.value = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: processedDatasets,
        },
        options: chartOptions,
        plugins: [avatarPlugin],
    })
}

// Lifecycle hooks
onBeforeMount(async () => {
    await renderChart()
})

// Watchers
watch(
    () => props.datasets,
    async () => {
        chart.value?.stop()
        loadedAvatars.value = {} // Clear cached avatars when data changes
        await renderChart()
    },
    { deep: true },
)
</script>

<style scoped>
.chart-container {
    position: relative;
    min-height: 400px;
    height: 100%;
    width: 100%;
}
</style>
