<template>
  <v-container>
    <v-row v-if="vounty">
      <v-col cols="12" class="break-text">
        <h1>{{ vounty.title }}</h1>
        <p>{{ vounty.subtitle }}</p>
      </v-col>
    </v-row>
    <v-row v-if="vounty">
      <v-col cols="12" md="8">
        <vounty-banner
          height="350px"
          font-size="50px"
          :image="vounty.image"
          text="Wanted<br>$$$"
          class="v-border"
        />
      </v-col>
      <v-col md="4" class="d-none d-md-block">
        <h1>{{ vounty.prize }}€</h1>
        <p>Total contributed</p>
        <h1>{{ vounty.fund_count }}</h1>
        <p>Users participated</p>
        <h1>{{ entries.length }}</h1>
        <p>Entries submitted</p>
        <v-btn
          block
          class="mb-4"
          :disabled="!$auth.loggedIn"
          @click="fundDialog=true"
        >
          Fund the vounty
        </v-btn>
        <v-btn
          block
          :disabled="!$auth.loggedIn"
          @click="entryDialog=true"
        >
          Make a submission
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-chip-group style="margin-bottom: 8px;">
          <template v-for="tag in vounty.tags">
            <nuxt-link
              :key="tag.id"
              :to="{ name: 'discover', query: { tag: tag.id }}"
              class="no-deco"
              replace
            >
              <v-chip :value="tag.id">
                {{ tag.text }}
              </v-chip>
            </nuxt-link>
          </template>
        </v-chip-group>
      </v-col>
      <v-col cols="12" class="d-md-none">
        <v-container>
          <v-row>
            <v-col>
              <h1>{{ vounty.prize }}€</h1>
              <p>Total contributed</p>
            </v-col>
            <v-col>
              <h1>{{ vounty.fund_count }}</h1>
              <p>Users participated</p>
            </v-col>
            <v-col>
              <h1>{{ entries.length }}</h1>
              <p>Entries submitted</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="mb-4"
                :disabled="!$auth.loggedIn"
                @click="fundDialog = true"
              >
                Fund the vounty
              </v-btn>
              <v-btn
                block
                :disabled="!$auth.loggedIn"
                @click="entryDialog = true"
              >
                Make a submission
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider class="mx-3" />
        <v-container class="pt-0 pb-0">
          <v-row no-gutters>
            <v-spacer>
              <v-tabs background-color="transparent">
                <v-tab @click="switchTab(0)">
                  Comments
                </v-tab>
                <v-tab @click="switchTab(1)">
                  Entries
                </v-tab>
              </v-tabs>
            </v-spacer>
            <v-col cols="12" class="d-block d-sm-none" />
            <v-col cols="12" class="d-block d-sm-none mb-6" />
            <v-col cols="3" class="d-block d-sm-none" />
            <v-col cols="3" style=" margin-top: 6px;">
              <p class="sort-text">
                Sort by:&nbsp;&nbsp;&nbsp;
              </p>
            </v-col>
            <v-col cols="6" sm="3" md="2" style="margin-top: 6px;">
              <v-select
                v-model="ordering"
                :items="orders"
                item-text="text"
                item-value="value"
                class="sorter"
                dense
                solo
                @change="readItems"
              />
            </v-col>
          </v-row>
        </v-container>
        <div v-if="tab === 0">
          <div v-if="$auth.loggedIn" class="d-flex flex-no-wrap">
            <vounty-avatar
              size="75px"
              font-size="50px"
              :image="$auth.user.image"
              text="V"
            />
            <v-text-field
              v-model="commentText"
              counter
              height="70px"
              label="New comment"
              class="comment-area"
              :rules="rules.commentText"
              @keyup.enter="createComment"
            />
          </div>
          <div v-if="comments.length > 0">
            <comment-card
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
            />
          </div>
          <div v-else class="text-center">
            <h1 class="mt-3 mb-8">
              There's nothing here.
            </h1>
          </div>
        </div>
        <div v-else>
          <div v-if="entries.length > 0">
            <entry-card
              v-for="entry in entries"
              :key="entry.id"
              :entry="entry"
            />
          </div>
          <div v-else class="text-center">
            <h1 class="mt-3 mb-8">
              There's nothing here.
            </h1>
          </div>
        </div>
        <v-pagination
          v-model="page"
          :length="Math.ceil(itemCount / pageSize || 1)"
          class="mt-3"
          @input="readItems"
        />
      </v-col>
    </v-row>
    <v-dialog
      v-if="$auth.loggedIn"
      v-model="fundDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h3>Fund the vounty</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center">
              <v-col cols="8">
                <h3>How much would you like to contribute?</h3>
              </v-col>
              <v-col cols="4">
                <currency-input
                  v-model="prize"
                  :currency="currency"
                  :value-range="valueRange"
                  class="prize-input"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <stripe-form
                  ref="stripe"
                  @token="stripeToken"
                  @error="stripeError"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p>Funding a vounty is a commitment on your part, to reward someone for completing an objective, no matter how long they may take to do so, and so it's generally irreversible. Unless the vounty is taken down, or some other special circumstances prompt us to return you your money, you can assume your contribution to be non refundable. If you think there's a valid reason for a refund, drop us a line at <a href="mailto:admin@vounty.io" target="_blank">admin@vounty.io</a></p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="fundDialog = false">
            Cancel
          </v-btn>
          <v-btn text @click="fundVounty">
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="$auth.loggedIn"
      v-model="entryDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h3>Make a submission</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="entryText"
                  :rules="rules.entryText"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p>If you have made a submission for claiming a vounty, whether or not the prize is yours is up to those that have contributed to said vounty. Simply put, if more than half of those that contributed decide that you've delivered what they were looking for, then the vounty is yours. It's clear that this system is easily exploitable, so the process is not completely automatic, and requires the input of an administrator.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="entryDialog = false">
            Cancel
          </v-btn>
          <v-btn text @click="createEntry">
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading" style="z-index: 1000;">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-container>
</template>

<script>
import { CurrencyInput } from 'vue-currency-input'
import StripeForm from '../components/StripeForm'
import CommentCard from '../components/CommentCard'
import EntryCard from '../components/EntryCard'
import VountyAvatar from '../components/VountyAvatar'
import VountyBanner from '../components/VountyBanner'

export default {
  components: {
    'currency-input': CurrencyInput,
    'stripe-form': StripeForm,
    'comment-card': CommentCard,
    'entry-card': EntryCard,
    'vounty-avatar': VountyAvatar,
    'vounty-banner': VountyBanner
  },
  data () {
    return {
      tab: 0,
      page: 1,
      pageSize: 10,
      commentText: '',
      entryText: '',
      loading: false,
      fundDialog: false,
      entryDialog: false,
      orders: [
        { value: '-vote_count', text: 'Most Voted' },
        { value: '-date', text: 'Latest' }
      ],
      ordering: '-vote_count',
      prize: 0.0,
      currency: {
        prefix: '',
        suffix: '€'
      },
      valueRange: {
        min: 5
      },
      confirm: {
        commentText: false,
        entryText: false
      },
      rules: {
        commentText: [
          v => !!v || 'The comment can\'t be empty.',
          v => v.length < 250 || 'Maximum 250 characters long',
          v => (this.confirm.commentText = !!v && v.length < 250)
        ],
        entryText: [
          v => !!v || 'The entry can\'t be empty',
          v => (this.confirm.entryText = !!v)
        ]
      }
    }
  },
  async fetch () {
    if (this.$route.query.id != null) {
      await this.readVounty()
      await this.readComments()
    }
  },
  computed: {
    vounty () {
      return this.$store.state.vounty.current
    },
    itemCount () {
      if (this.tab === 0) return this.$store.state.comment.count
      else return this.$store.state.entry.count
    },
    comments () {
      return this.$store.state.comment.results
    },
    entries () {
      return this.$store.state.entry.results
    }
  },
  watch: {
    async $route (to, from) {
      if (to.query.id != null) {
        await this.readVounty()
        await this.readComments()
      }
    }
  },
  methods: {
    readVounty () {
      this.loading = true
      return this.$store.dispatch('vounty/read', {
        id: this.$route.query.id
      }).then((data) => {
        this.loading = false
        return data
      })
    },
    readItems () {
      if (this.tab === 0) {
        return this.readComments()
      } else {
        return this.readEntries()
      }
    },
    async createComment () {
      if (!this.confirm.commentText) return
      this.loading = true
      await this.$store.dispatch('comment/create', {
        data: {
          user: this.$auth.user.id,
          vounty: this.vounty.id,
          text: this.commentText
        }
      }).then(async (data) => {
        await this.readComments()
        this.commentText = ''
        this.loading = false
        return data
      })
    },
    readComments () {
      this.loading = true
      return this.$store.dispatch('comment/read', {
        params: {
          vounty__id: this.vounty.id,
          page: this.page,
          ordering: this.ordering
        }
      }).then((data) => {
        this.loading = false
        return data
      })
    },
    async createEntry () {
      if (!this.confirm.entryText) return
      this.loading = true
      await this.$store.dispatch('entry/create', {
        data: {
          user: this.$auth.user.id,
          vounty: this.vounty.id,
          text: this.entryText
        }
      }).then(async (data) => {
        await this.readEntries()
        this.entryDialog = false
        this.entryText = ''
        this.loading = false
        return data
      })
    },
    readEntries () {
      this.loading = true
      return this.$store.dispatch('entry/read', {
        params: {
          vounty__id: this.vounty.id,
          page: this.page,
          ordering: this.ordering
        }
      }).then((data) => {
        this.loading = false
        return data
      })
    },
    fundVounty () {
      this.$refs.stripe.submit()
      this.fundDialog = false
      this.loading = true
    },
    stripeToken (token) {
      this.$refs.stripe.clear()
      return this.$store.dispatch('vounty/fund', {
        data: {
          token,
          id: this.vounty.id,
          amount: this.vounty.prize
        }
      }).then(async (data) => {
        await this.readVounty()
        this.loading = false
        return data
      })
    },
    stripeError (error) {
      // TODO: Handle error.
      throw error
    },
    switchTab (tab) {
      this.tab = tab
      this.page = 1
      if (tab === 0) {
        return this.readComments()
      } else {
        return this.readEntries()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.prize-input {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  padding-right: 6px;
  text-align: right;
  width: 100%;
  word-break: keep-all;
}

.prize-input:focus {
  outline: none;
}

::v-deep .theme--dark.v-pagination .v-pagination__item--active {
  color: #000;
  outline: none;
}

.comment-area {
  margin-right: 16px;
}

.sort-text {
  margin-top: 6px;
  text-align: right;
}

.wanted-text {
  font-family: 'Rye', sans-serif;
  font-size: 100px;
  text-align: center;
}

@media screen and (max-width:1264px) {
  .wanted-text {
    font-size: 80px;
  }
}
</style>
