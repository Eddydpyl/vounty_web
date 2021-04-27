<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-chip-group active-class="white black--text">
          <v-chip v-for="tag in tags" :key="tag.id">
            {{ tag.text }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <h3 class="mb-3">
          Featured vounty
        </h3>
        <vounty-card :vounty="featured" />
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
    <v-row>
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
      ],
      featured: {
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
      popular: [
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
      recent: [
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
  computed: {
    mobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return true
        default: return false
      }
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
