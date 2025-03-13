<template>
    <div :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }">
        <div :style="{ fontSize: '12px' }">
            made by
            <a
                :style="{ color: 'orange', cursor: 'pointer' }"
                :href="'https://www.twitch.tv/escanor______'"
                target="_blank"
            >
                Escanor______
            </a>
        </div>
        <a href="discord://-/users/289041036364480512"><IconBrandDiscordFilled /></a>
    </div>
</template>
<script setup lang="ts">
import { IconBrandDiscordFilled } from '@tabler/icons-vue'
</script>
<style scoped></style>
