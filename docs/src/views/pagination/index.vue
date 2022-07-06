<template>
  <div>
    <y-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @size-change="fetchList"
      @current-change="fetchList"
    />
    {{ currentPage }}
    {{ pageSize }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 1000
    }
  },
  methods: {
    fetchList() {}
  }
}
</script>
