<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import { throttle } from 'lodash-es'
import YoIcon from '../Icon/Icon.vue';
defineOptions({
  name: 'YoButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  throttleDuration: 500
})
const slots = defineSlots()
const _ref = ref<HTMLButtonElement>()

const iconStyle = computed(() => {
  return slots.default ? { marginRight: '6px' } : {}
})

const emits = defineEmits<ButtonEmits>()

const hanleButtonClick = (e: MouseEvent) => {
  emits('click', e)
}

const hanleButtonClickThrottle = throttle(hanleButtonClick, props.throttleDuration)

defineExpose<ButtonInstance>({
  ref: _ref,
})
</script>
<template>
  <component
    ref="_ref"
    class="yo-button"
    :is="tag"
    :type="tag === 'button' ? nativeType : void 0"
    :autofocus="autofocus"
    :disabled="disabled || loading" :class="{
      [`yo-button--${type}`]: type,
      [`yo-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
      'is-disabled': disabled
    }" @click="(e: MouseEvent) => useThrottle ? hanleButtonClickThrottle(e) : hanleButtonClick(e)">
    <template v-if="loading">
      <slot name="loading">
        <yo-icon class="loading-icon" :icon="loadingIcon ?? 'spinner'" size="1x" :style="iconStyle" spin />
      </slot>
    </template>
    <yo-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x"></yo-icon>
    <slot></slot>
  </component>
</template>
<style lang="css">
@import './style.css';
</style>