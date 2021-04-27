<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      404 Page Not Found
    </h1>
    <div v-else>
      <h1>{{ error.statusCode }} Something went wrong</h1>
      <h2>Please, send a screenshot to <a href="mailto:eddydpyl@vounty.io" target="_blank">eddydpyl@vounty.io</a></h2>
    </div>
    <div v-if="message">
      <h3>{{ message }}</h3>
      <p />
    </div>
    <pre v-if="data"><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
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
    message () {
      return this.$store.state.error.message
    },
    data () {
      return this.$store.state.error.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
