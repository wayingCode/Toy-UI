<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type {
  CollapseItemName,
  CollapseProps,
  CollapseEmits
} from './types'
import { each } from 'lodash-es';
import { COLLAPSE_CTX_KEY } from './constants';
import { debugWarn } from '@toy-ui/utils'
const COMP_NAME = 'YoCollapse'
defineOptions({
  name: COMP_NAME,
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue || [])

if (props.accordion && activeNames.value.length > 1) {
  debugWarn(COMP_NAME, 'The accordion mode should have one active name at most')
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = _activeNames[0] === item ? [] : [item]
    updateActiveNames(_activeNames)
    return
  }
  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

function updateActiveNames(names: CollapseItemName[]) {
  activeNames.value = names
  each(['update:modelValue', 'change'], (event) => {
    emits(event as 'update:modelValue' & 'change', names)
  })
}

watch(
  () => props.modelValue,
  val => updateActiveNames(val || [])
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})
</script>
<template>
  <div class="yo-collapse">
    <slot />
  </div>
</template>

<style scoped>
@import './style.css';
</style>