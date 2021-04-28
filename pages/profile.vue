<template>
  <v-container style="margin-top: 32px;">
    <v-row v-if="user" align="center">
      <v-col cols="12" style="text-align: center;">
        <vounty-avatar
          size="150px"
          font-size="100px"
          :image="user.image"
          :editable="isme"
          text="V"
          @change="upload"
        />
      </v-col>
      <v-col cols="12" style="text-align: center;">
        <h1>{{ user.username }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="12" sm="8">
        <v-tabs centered background-color="transparent">
          <v-tab @click="switchTab(0)">
            About
          </v-tab>
          <v-tab @click="switchTab(1)">
            Created
          </v-tab>
          <v-tab @click="switchTab(2)">
            Funded
          </v-tab>
        </v-tabs>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row v-if="tab === 0">
      <v-spacer />
      <v-col cols="12" sm="8">
        <div v-if="isme">
          <v-textarea
            v-model="about"
            placeholder="Tells others something about yourself..."
          />
          <v-container style="margin-bottom: 8px;">
            <v-row align="center">
              <v-spacer />
              <v-btn @click="updateAbout">
                Update
              </v-btn>
            </v-row>
          </v-container>
        </div>
        <p v-else-if="user">
          <span style="white-space: pre-line;">{{ user.about }}</span>
        </p>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row v-if="tab === 1">
      <v-spacer />
      <v-col cols="12" sm="8">
        <small-vounty-card
          v-for="vounty in created"
          :key="vounty.id"
          :vounty="vounty"
          class="mb-4"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row v-if="tab === 2">
      <v-spacer />
      <v-col cols="12" sm="8">
        <small-vounty-card
          v-for="vounty in funded"
          :key="vounty.id"
          :vounty="vounty"
          class="mb-4"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-pagination
      v-if="tab !== 0"
      v-model="page"
      :length="Math.ceil(itemCount / pageSize || 1)"
      @input="readItems"
    />
  </v-container>
</template>

<script>
import SVountyCard from '../components/SVountyCard'
import VountyAvatar from '../components/VountyAvatar'
import UploadService from '../services/upload'

export default {
  components: {
    'small-vounty-card': SVountyCard,
    'vounty-avatar': VountyAvatar
  },
  data () {
    return {
      tab: 0,
      page: 1,
      about: '',
      maxSizeMB: 5,
      pageSize: 10,
      created: [],
      funded: []
    }
  },
  async fetch () {
    const id = this.$route.query.id || this.$auth.user.id
    await this.$store.dispatch('user/read', { id })
    this.about = this.user.about
  },
  computed: {
    user () {
      return this.$store.state.user.current
    },
    isme () {
      return this.user && this.user.id === this.$auth.user.id
    },
    itemCount () {
      if (this.tab === 0) return -1
      if (this.tab === 1) return this.created.length
      return this.funded.length
    }
  },
  watch: {
    async $route (to, from) {
      const id = to.query.id || this.$auth.user.id
      await this.$store.dispatch('user/read', { id })
      this.about = this.user.about
    }
  },
  methods: {
    async upload (e) {
      if (e.target.files) {
        const file = e.target.files[0]
        const links = await this.$store.dispatch('storage/link')
        const image = await UploadService.uploadImage(file, links, this.maxSizeMB)
        await this.$store.dispatch('user/update', {
          id: this.user.id,
          data: { image }
        })
        await this.$store.dispatch('user/read', {
          id: this.user.id
        })
      }
    },
    updateAbout () {
      return this.$store.dispatch('user/update', {
        id: this.user.id,
        data: {
          about: this.about
        }
      })
    },
    readItems () {
      if (this.tab === 1) return this.readCreated()
      if (this.tab === 2) return this.readFunded()
    },
    async readCreated () {
      this.created = await this.$store.dispatch('vounty/read', {
        params: {
          user__id: this.user.id,
          page_size: 10,
          page: this.page
        }
      }).then(data => data.results)
    },
    async readFunded () {
      // TODO
    },
    switchTab (tab) {
      this.tab = tab
      this.page = 1
      if (tab === 1) {
        return this.readCreated()
      }
      if (tab === 2) {
        return this.readFunded()
      }
    }
  }
}
</script>

<style scoped>
::v-deep .theme--dark.v-pagination .v-pagination__item--active {
  color: #000;
  outline: none;
}
</style>
