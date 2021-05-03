<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <nuxt-link
        v-if="vounty.id && !editable"
        :to="{ name: 'vounty', query: { id: vounty.id }}"
        class="break-text no-deco"
      >
        <v-card-title v-text="vounty.title" />
        <v-card-subtitle v-text="vounty.subtitle" />
      </nuxt-link>
      <div v-else class="break-text">
        <v-card-title v-text="vounty.title" />
        <v-card-subtitle v-text="vounty.subtitle" />
      </div>
      <nuxt-link
        v-if="vounty.id && !editable"
        :to="{ name: 'vounty', query: { id: vounty.id }}"
        class="no-deco"
      >
        <vounty-avatar
          size="125px"
          font-size="25px"
          :image="vounty.image"
          :editable="editable"
          text="Wanted<br>$$$"
          @change="$emit('upload', $event)"
        />
      </nuxt-link>
      <div v-else>
        <vounty-avatar
          size="125px"
          font-size="25px"
          :image="vounty.image"
          :editable="editable"
          text="Wanted<br>$$$"
          @change="$emit('upload', $event)"
        />
      </div>
    </div>
    <v-divider class="mx-4" />
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
import VountyAvatar from '../components/VountyAvatar'

export default {
  name: 'SVountyCard',
  components: {
    'vounty-avatar': VountyAvatar
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
.wanted-text {
  font-family: 'Rye', sans-serif;
  font-size: 20px;
}

.card-prize {
  width: 200px;
  word-break: keep-all;
}
</style>
