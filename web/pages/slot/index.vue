<template>
  <div>
    <h1>Slots</h1>

    <SlotCard
      v-for="(event, index) in events"
      :key="index"
      :event="event"
      :data-index="index"
    />
  </div>
</template>
<script>
import SlotCard from '@/components/SlotCard.vue'
// import SlotService from '@/services/SlotService.js'
import { mapState } from 'vuex'

export default {
  components: {
    SlotCard,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('events/fetchSlots')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch Slots.',
      })
    }
  },

  computed: mapState({
    slots: (state) => state.slots.slots,
  }),
  head() {
    return {
      title: 'Slot Listing',
    }
  },
}
</script>
