<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import type { AlertProps, AlertEmits, AlertInstance } from './types'
import { typeIconMap } from '@toy-ui/utils'
import YoIcon from '../Icon/Icon.vue';
defineOptions({
  name: 'YoAlert'
})

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  effect: 'light',
  closable: true
})

const emits = defineEmits<AlertEmits>()
const slots = useSlots()

const visible = ref(true)
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const withDescription = computed(() => props.description || slots.default)

function close() {
  visible.value = false
  emits('close')
}

function open () {
  visible.value = true
}

defineExpose<AlertInstance>({
  open,
  close
})
</script>
<template>
  <transition name="yo-alert-fade">
    <div
      v-show="visible"
      class="yo-alert"
      role="alert"
      :class="{
        [`yo-alert__${type}`]: type,
        [`yo-alert__${effect}`]: effect,
        'text-center': center
      }"
    >
      <yo-icon
        v-if="showIcon"
        class="yo-alert__icon"
        :class="{
          'big-icon': withDescription
        }"
        :icon="iconName"
      />
      <div class="yo-alert__content">
        <span
          class="yo-alert__title"
          :class="{ 'with-desc': withDescription}"
          :style="{ display: center && !showIcon ? 'flow' : 'inline'}"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="yo-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="yo-alert__close" v-if="closable">
          <yo-icon
            icon="xmark"
            @click.stop="close"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import './style.css';
</style>