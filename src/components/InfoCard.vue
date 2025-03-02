<template>
    <div class="main-container"></div>
</template>

<script setup lang="ts">
import { PlayerAccounts } from '@/common/consts'
import { getUserGamesFromCurrentMonth } from '@/services/chessService'

//most elo gained today

console.log(getUserGamesFromCurrentMonth(PlayerAccounts.Kasix))
</script>

<style scoped>
.main-container {
    width: 30rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
