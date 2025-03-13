<template>
    <div class="countdown">
        <h2>{{ props.text }}</h2>
        <div class="timer">
            <span>{{ timeLeft.days }}d</span>
            <span>{{ timeLeft.hours }}h</span>
            <span>{{ timeLeft.minutes }}m</span>
            <span>{{ timeLeft.seconds }}s</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
    text: string
    date: Date
}>()
// Target date: April 24, 2025, at 17:00
const targetDate = props.date.getTime()

// Reactive countdown state
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

let timer: number | null = null

// Function to update countdown
const updateCountdown = () => {
    const now = new Date().getTime()
    const diff = targetDate - now

    if (diff <= 0) {
        timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
        if (timer !== null) clearInterval(timer)
    } else {
        timeLeft.value = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        }
    }
}

// Start countdown on mount
onMounted(() => {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
})

// Clean up timer when unmounting
onBeforeUnmount(() => {
    if (timer !== null) clearInterval(timer)
})
</script>

<style scoped>
.countdown {
    font-size: 15px;
    text-align: center;
    font-family: Arial, sans-serif;
}
.timer {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 6px;
}
.timer span {
    background: #222;
    color: white;
    padding: 10px 18px;
    border-radius: 5px;
    min-width: 70px;
}
</style>
