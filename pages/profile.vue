<template>
  <v-container style="margin-top: 32px;">
    <v-row align="center">
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
          <v-tab @click="tab = 0">
            About
          </v-tab>
          <v-tab @click="tab = 1">
            Created
          </v-tab>
          <v-tab @click="tab = 2">
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
        <p v-else>
          {{ user.description }}
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
        <v-pagination v-model="page" :length="3" class="mt-3" />
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
        <v-pagination v-model="page" :length="3" class="mt-3" />
      </v-col>
      <v-spacer />
    </v-row>
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
      created: [
        {
          id: 1,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        },
        {
          id: 2,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        },
        {
          id: 3,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        }
      ],
      funded: [
        {
          id: 1,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        },
        {
          id: 2,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        },
        {
          id: 3,
          title: 'Lorem Ipsum',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          prize: 276.57,
          tags: [
            {
              id: 1,
              text: 'Tag 1'
            },
            {
              id: 2,
              text: 'Tag 2'
            },
            {
              id: 3,
              text: 'Tag 3'
            },
            {
              id: 4,
              text: 'Tag 4'
            }
          ]
        }
      ]
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
      return this.user.id === this.$auth.user.id
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
