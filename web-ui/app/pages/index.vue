<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart
          :period="period"
          :range="range"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '../types'

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>('daily')
</script>
