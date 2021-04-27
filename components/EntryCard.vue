<template>
  <div class="d-block">
    <div class="d-flex flex-no-wrap">
      <div class="entry-votes">
        <v-icon small class="d-block">
          mdi-arrow-up-bold
        </v-icon>
        <div>{{ entry.likes }}</div>
        <v-icon small class="d-block">
          mdi-arrow-down-bold
        </v-icon>
      </div>
      <div>
        <div class="d-flex flex-no-wrap">
          <nuxt-link :to="{ name: 'profile', query: { id: entry.user.id }}" style="text-decoration: none;">
            <v-avatar class="v-border ma-3" size="25px" tile>
              <v-img v-if="entry.user.image" :src="entry.user.image" />
              <div v-else class="v-text ">
                <p class="profile-symbol">
                  V
                </p>
              </div>
            </v-avatar>
          </nuxt-link>
          <nuxt-link :to="{ name: 'profile', query: { id: entry.user.id }}" style="text-decoration: none;">
            <div style="margin-top: 12px;">
              <b>{{ entry.user.name }}</b> • 10 min ago<br>
            </div>
          </nuxt-link>
        </div>
        <div class="mb-2 mr-3" style="margin-left: 12px;">
          {{ entry.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryCard',
  props: {
    entry: {
      type: Object,
      default () {
        return { tags: [] }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-votes {
  flex: 0 0 15px;
  margin-left: 8px;
  margin-top: 12px;
  text-align: center;
  width: 15px;
}

.profile-symbol {
  font-size: 16px;
  margin-top: 16px;
}
</style>
