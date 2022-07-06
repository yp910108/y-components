<template>
  <div>
    <y-select v-model="value" :options="options" filterable placeholder="请选择">
      <y-option-group v-for="group in options" :key="group.label" :label="group.label">
        <y-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
      </y-option-group>
    </y-select>
    <y-select v-model="value" :options="options" filterable placeholder="请选择" style="margin-top: 20px" />
    {{ value }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      value: ''
    }
  }
}
</script>
