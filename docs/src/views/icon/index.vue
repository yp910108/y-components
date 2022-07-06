<template>
  <div style="font-size: 12px">
    <y-icon icon="example" />
  </div>
</template>

<script>
function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('./svg', false, /\.svg$/))
</script>
