<script setup lang="ts">
import { ref } from 'vue'
const collapseValue = ref(['a', 'b'])
</script>

<template>
  <yo-button type="primary" size="large">button</yo-button>
  <yo-icon icon="spinner" />
  <yo-alert
    title="标题"
    describedby="描述描述描述描述描述"
    type="danger"
  ></yo-alert>
  <yo-collapse accordion v-model="collapseValue">
    <yo-collapse-item name="a" title="Title a">
      <div>this is content a</div>
    </yo-collapse-item>
    <yo-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </yo-collapse-item>
    <yo-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </yo-collapse-item>
  </yo-collapse>
</template>
