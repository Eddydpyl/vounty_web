<template>
  <div class="d-flex flex-no-wrap">
    <div>
      <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" class="no-deco">
        <vounty-avatar
          size="75px"
          font-size="50px"
          :image="comment.user.image"
          text="V"
        />
      </nuxt-link>
      <div class="d-block d-sm-none ml-6 mb-2">
        <v-icon
          small
          style="margin-top: -4px;"
          :class="{ 'liked-text': upvote }"
          @click="createVote(true)"
        >
          mdi-chevron-up
        </v-icon>
        <span :class="{ 'liked-text': upvote, 'disliked-text': downvote }">
          {{ count }}
        </span>
        <v-icon
          small
          style="margin-top: -4px;"
          :class="{ 'disliked-text': downvote }"
          @click="createVote(false)"
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </div>
    <div style="padding-top: 8px;">
      <p class="d-none d-sm-block">
        <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" class="no-deco">
          <b>{{ comment.user.username }}</b> • {{ $moment(comment.date + 'Z').fromNow() }}<br>
        </nuxt-link>
        {{ comment.text }}<br>
        <v-icon
          small
          style="margin-top: -4px;"
          :class="{ 'liked-text': upvote }"
          @click="createVote(true)"
        >
          mdi-chevron-up
        </v-icon>
        <span :class="{ 'liked-text': upvote, 'disliked-text': downvote }">
          {{ count }}
        </span>
        <v-icon
          small
          style="margin-top: -4px;"
          :class="{ 'disliked-text': downvote }"
          @click="createVote(false)"
        >
          mdi-chevron-down
        </v-icon>
      </p>
      <p class="d-block d-sm-none">
        <nuxt-link :to="{ name: 'profile', query: { id: comment.user.id }}" class="no-deco">
          <b>{{ comment.user.username }}</b> • {{ $moment(comment.date + 'Z').fromNow() }}<br>
        </nuxt-link>
        {{ comment.text }}
      </p>
    </div>
  </div>
</template>

<script>
import VountyAvatar from '../components/VountyAvatar'

export default {
  name: 'CommentCard',
  components: {
    'vounty-avatar': VountyAvatar
  },
  props: {
    comment: {
      type: Object,
      default () {
        return {
          tags: [],
          votes: []
        }
      }
    }
  },
  data () {
    return {
      voted: false,
      liked: false
    }
  },
  computed: {
    count () {
      if (this.vote) {
        if (this.vote.like) {
          const aux = this.voted ? this.liked ? 0 : -2 : 0
          return this.comment.vote_count + aux
        } else {
          const aux = this.voted ? this.liked ? +2 : 0 : 0
          return this.comment.vote_count + aux
        }
      } else {
        const aux = this.voted ? this.liked ? 1 : -1 : 0
        return this.comment.vote_count + aux
      }
    },
    vote () {
      return this.comment.votes.find(v => v.user.id === this.$auth.user.id)
    },
    upvote () {
      return (this.vote && this.vote.like && (!this.voted || this.liked)) || (this.voted && this.liked)
    },
    downvote () {
      return (this.vote && !this.vote.like && (!this.voted || !this.liked)) || (this.voted && !this.liked)
    }
  },
  methods: {
    createVote (like) {
      return this.$store.dispatch('comment/vote', {
        data: {
          id: this.comment.id,
          like
        }
      }).then((result) => {
        this.voted = true
        this.liked = like
        return result
      })
    }
  }
}
</script>

<style scoped>
.liked-text {
  color: #a7ffeb;
  font-weight: bold;
}

.disliked-text {
  color: #ff9e80;
  font-weight: bold;
}
</style>
