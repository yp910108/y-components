<template>
  <div>
    <y-upload v-model="files" action="/api/upload" list-type="picture-card" />
    {{ files }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [
        {
          name: '6D4E918D-CC53-418A-B1C4-9A49ACEDF73E.png',
          url: 'http://localhost:3001/uploads/upload_f77790583913c0dde9bda18350b9d89e.png'
        }
      ]
    }
  }
}
</script>
