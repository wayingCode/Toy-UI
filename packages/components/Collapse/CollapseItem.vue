<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { COLLAPSE_CTX_KEY } from './constants'
import YoIcon from '../Icon/Icon.vue'
import transitionEvents from './transitionEvents';
defineOptions({
  name: 'YoCollapseItem',
})
const props = defineProps<CollapseItemProps>()

const ctx = inject(COLLAPSE_CTX_KEY)

const isActive = computed(() => {
  return ctx?.activeNames.value.includes(props.name)
})

function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props.name)
}
</script>

<template>
  <div
    class="yo-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="yo-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled
      }"
      @click="handleClick"
    >
      <span class="yo-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <yo-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="yo-collapse-item__wrapper" v-show="isActive">
        <div class="yo-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>