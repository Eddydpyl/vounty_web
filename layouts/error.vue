<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      404 Page Not Found
    </h1>
    <div v-else>
      <h1>{{ error.statusCode }} Something went wrong</h1>
      <h2>Please, send a screenshot to <a href="mailto:eddydpyl@vounty.io" target="_blank">eddydpyl@vounty.io</a></h2>
    </div>
    <div v-if="method">
      <h3>Unhandled error when calling {{ method }}</h3>
      <p />
    </div>
    <pre v-if="payload"><code>{{ JSON.stringify(payload, null, 2) }}</code></pre>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    method () {
      return this.$store.state.error.method
    },
    payload () {
      return this.$store.state.error.payload
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
