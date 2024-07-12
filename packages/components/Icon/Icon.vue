<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types.ts'
import { omit } from 'lodash-es';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'YoIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyle = computed(() => ({color: props.color ?? void 0}))
</script>

<template>
  <i
    class="yo-icon"
    :class="{[`yo-icon--${props.type}`]: props.type}"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps"  />
  </i>
</template>
<style scoped>
@import "./index.css";
</style>