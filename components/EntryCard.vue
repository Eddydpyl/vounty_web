<template>
  <div class="d-block">
    <div class="d-flex flex-no-wrap">
      <div class="entry-votes">
        <v-icon
          small
          class="d-block"
          :class="{ 'liked-text': upvote }"
          @click="createVote(true)"
        >
          mdi-arrow-up-bold
        </v-icon>
        <div :class="{ 'liked-text': upvote, 'disliked-text': downvote }">
          {{ count }}
        </div>
        <v-icon
          small
          class="d-block"
          :class="{ 'disliked-text': downvote }"
          @click="createVote(false)"
        >
          mdi-arrow-down-bold
        </v-icon>
      </div>
      <div>
        <div class="d-flex flex-no-wrap">
          <nuxt-link :to="{ name: 'profile', query: { id: entry.user.id }}" style="text-decoration: none;">
            <vounty-avatar
              size="25px"
              font-size="16px"
              :image="entry.user.image"
              text="V"
            />
          </nuxt-link>
          <nuxt-link :to="{ name: 'profile', query: { id: entry.user.id }}" style="text-decoration: none;">
            <div style="margin-top: 12px;">
              <b>{{ entry.user.username }}</b> • {{ $moment(entry.date + 'Z').fromNow() }}<br>
            </div>
          </nuxt-link>
        </div>
        <div class="mb-2 mr-3 ml-3">
          <span style="white-space: pre-line;">{{ entry.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VountyAvatar from '../components/VountyAvatar'

export default {
  name: 'EntryCard',
  components: {
    'vounty-avatar': VountyAvatar
  },
  props: {
    entry: {
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
          return this.entry.vote_count + aux
        } else {
          const aux = this.voted ? this.liked ? +2 : 0 : 0
          return this.entry.vote_count + aux
        }
      } else {
        const aux = this.voted ? this.liked ? 1 : -1 : 0
        return this.entry.vote_count + aux
      }
    },
    vote () {
      return this.entry.votes.find(e => e.user.id === this.$auth.user.id)
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
      return this.$store.dispatch('entry/vote', {
        data: {
          id: this.entry.id,
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

<style lang="scss" scoped>
.entry-votes {
  flex: 0 0 15px;
  margin-left: 8px;
  margin-top: 12px;
  text-align: center;
  width: 15px;
}

.liked-text {
  color: #a7ffeb;
  font-weight: bold;
}

.disliked-text {
  color: #ff9e80;
  font-weight: bold;
}
</style>
