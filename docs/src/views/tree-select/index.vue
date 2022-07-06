<template>
  <div>
    <y-tree-select v-model="val1" :options="tree1" @change="handleChange1" />{{ val1 }}
    <y-tree-select
      v-model="val2"
      node-key="id"
      :props="{
        label: 'name',
        children: 'childNode'
      }"
      :options="tree2"
      show-checkbox
      style="margin-top: 20px"
      @change="handleChange2"
    />
    {{ val2 }}
  </div>
</template>

<script>
import { tree1, tree2 } from './tree'

export default {
  data() {
    return {
      tree1,
      tree2,
      val1: undefined,
      val2: undefined
    }
  },
  methods: {
    handleChange1(val, item) {
      console.log(val, item)
    },
    handleChange2(vals, list) {
      console.log(vals, list)
    }
  }
}
</script>
