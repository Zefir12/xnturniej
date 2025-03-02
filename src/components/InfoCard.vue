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
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
