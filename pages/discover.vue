<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-chip-group v-model="tagId" active-class="white black--text">
          <template v-for="tag in tags">
            <nuxt-link
              :key="tag.id"
              :to="{ name: 'discover', query: { tag: tag.id }}"
              class="no-deco"
              replace
            >
              <v-chip :value="tag.id">
                {{ tag.text }}
              </v-chip>
            </nuxt-link>
          </template>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row v-if="popular.length > 0">
      <v-col cols="12" lg="6">
        <h3 class="mb-3">
          Featured vounty
        </h3>
        <vounty-card
          v-if="featured"
          :vounty="featured"
          height="450px"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <h3 class="mb-3">
          Popular vounties
        </h3>
        <div v-if="mobile">
          <vounty-card
            v-for="(vounty, index) in popular"
            :key="vounty.id"
            :vounty="vounty"
            :class="{ 'mb-5': index !== popular.length - 1 }"
          />
        </div>
        <div v-else class="popular-scroll">
          <small-vounty-card
            v-for="vounty in popular"
            :key="vounty.id"
            :vounty="vounty"
            class="mb-4"
          />
        </div>
      </v-col>
    </v-row>
    <v-row v-if="recent.length > 0">
      <v-col cols="12">
        <h3 class="mb-3">
          Recent vounties
        </h3>
        <div v-if="mobile">
          <vounty-card
            v-for="(vounty, index) in recent"
            :key="vounty.id"
            :vounty="vounty"
            :class="{ 'mb-5': index !== popular.length - 1 }"
          />
        </div>
        <div v-else>
          <vue-horizontal>
            <vounty-card
              v-for="vounty in recent"
              :key="vounty.id"
              :vounty="vounty"
              style="width: 400px;"
              class="mx-2"
            />
          </vue-horizontal>
        </div>
      </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <v-col cols="12">
        <h1>There's nothing here...</h1>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-container>
</template>

<script>
import VountyCard from '../components/VountyCard'
import SVountyCard from '../components/SVountyCard'

export default {
  components: {
    'vounty-card': VountyCard,
    'small-vounty-card': SVountyCard
  },
  data () {
    return {
      loading: false,
      featured: null,
      popular: [],
      recent: [],
      tagId: null
    }
  },
  async fetch () {
    await this.readVounties()
    await this.$store.dispatch('tag/read', {})
    if (this.$route.query.tag != null) {
      this.tagId = this.$route.query.tag
    }
  },
  computed: {
    mobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return true
        default: return false
      }
    },
    tags () {
      return this.$store.state.tag.results
    }
  },
  watch: {
    $route (to, from) {
      if (to.query.tag) {
        this.tagId = to.query.tag
        this.readVounties()
      }
    }
  },
  methods: {
    async readVounties () {
      this.loading = true
      this.featured = await this.$store.dispatch('vounty/read', {
        params: {
          tags__id: this.tagId,
          featured: 'True',
          ordering: '-date',
          page_size: 1
        }
      }).then(data => data.results ? data.results[0] : null)
      this.popular = await this.$store.dispatch('vounty/read', {
        params: {
          tags__id: this.tagId,
          ordering: '-fund_count',
          page_size: 5
        }
      }).then(data => data.results)
      this.recent = await this.$store.dispatch('vounty/read', {
        params: {
          tags__id: this.tagId,
          ordering: '-date',
          page_size: 5
        }
      }).then(data => data.results)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.popular-scroll {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
