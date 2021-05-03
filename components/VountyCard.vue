<template>
  <v-card :height="height" class="v-card">
    <nuxt-link
      v-if="vounty.id"
      :to="{ name: 'vounty', query: { id: vounty.id }}"
      class="no-deco"
      style="flex: 1;"
    >
      <vounty-banner
        height="250px"
        font-size="50px"
        :image="vounty.image"
        :editable="editable"
        text="Wanted<br>$$$"
        @change="$emit('upload', $event)"
      />
      <v-card-title class="headline" v-text="vounty.title" />
      <v-card-subtitle v-text="vounty.subtitle" />
    </nuxt-link>
    <div v-else style="flex: 1;">
      <vounty-banner
        height="250px"
        font-size="50px"
        :image="vounty.image"
        :editable="editable"
        text="Wanted<br>$$$"
        @change="$emit('upload', $event)"
      />
      <v-card-title class="headline" v-text="vounty.title" />
      <v-card-subtitle v-text="vounty.subtitle" />
    </div>
    <v-divider class="mx-4 mt-3" />
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-text>
        <v-chip-group>
          <template v-for="tag in vounty.tags">
            <nuxt-link
              :key="tag.id"
              :to="{ name: 'discover', query: { tag: tag.id }}"
              class="no-deco"
              replace
            >
              <v-chip>
                {{ tag.text }}
              </v-chip>
            </nuxt-link>
          </template>
        </v-chip-group>
      </v-card-text>
      <slot name="prize">
        <v-card-title
          class="justify-end card-prize"
          v-text="vounty.prize + '€'"
        />
      </slot>
    </div>
  </v-card>
</template>
<script>
import VountyBanner from '../components/VountyBanner'

export default {
  name: 'VountyCard',
  components: {
    'vounty-banner': VountyBanner
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    vounty: {
      type: Object,
      default () {
        return { tags: [] }
      }
    },
    height: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  display: flex;
  flex-direction: column;
}

.card-prize {
  width: 200px;
  word-break: keep-all;
}
</style>
