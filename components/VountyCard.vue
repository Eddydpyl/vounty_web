<template>
  <v-card>
    <nuxt-link
      v-if="vounty.id"
      :to="{ name: 'vounty', query: { id: vounty.id }}"
      style="text-decoration: none;"
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
    <div v-else>
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
              style="text-decoration: none;"
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
    }
  }
}
</script>

<style lang="scss" scoped>
.card-prize {
  width: 200px;
  word-break: keep-all;
}
</style>
