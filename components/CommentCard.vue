<template>
  <div class="d-flex flex-no-wrap">
    <div>
      <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" style="text-decoration: none;">
        <v-avatar class="v-border ma-3" size="75px" tile>
          <v-img v-if="comment.user.image" :src="comment.user.image" />
          <div v-else class="v-text ">
            <p class="profile-symbol">
              V
            </p>
          </div>
        </v-avatar>
      </nuxt-link>
      <div class="d-block d-sm-none ml-6 mb-2">
        <v-icon small style="margin-top: -4px;">
          mdi-chevron-up
        </v-icon>
        {{ comment.likes }}
        <v-icon small style="margin-top: -4px;">
          mdi-chevron-down
        </v-icon>
      </div>
    </div>
    <div style="padding-top: 8px;">
      <p class="d-none d-sm-block">
        <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" style="text-decoration: none;">
          <b>{{ comment.user.name }}</b> • 10 min ago<br>
        </nuxt-link>
        {{ comment.text }}<br>
        <v-icon small style="margin-top: -4px;">
          mdi-chevron-up
        </v-icon>
        {{ comment.likes }}
        <v-icon small style="margin-top: -4px;">
          mdi-chevron-down
        </v-icon>
      </p>
      <p class="d-block d-sm-none">
        <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" style="text-decoration: none;">
          <b>{{ comment.user.name }}</b> • 10 min ago<br>
        </nuxt-link>
        {{ comment.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  props: {
    comment: {
      type: Object,
      default () {
        return { tags: [] }
      }
    }
  }
}
</script>

<style scoped>
.profile-symbol {
  font-size: 50px;
  margin-top: 16px;
}
</style>
