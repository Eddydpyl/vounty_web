<template>
  <flow-form
    ref="flowform"
    :questions="questions"
    :language="language"
    :standalone="false"
    @complete="onComplete"
  >
    <template #complete>
      <h2 class="final-title">
        Almost done!
      </h2>
      <p class="final-subtitle">
        Below is a preview of how your vounty would look. You can add an image to the vounty. You can also click on the prize money to change how much you would like to contribute to kick things off. The minimum amount is 5€. Your credit card information is not stored in our database, and only used to process the payment through Stripe.
      </p>
      <vounty-card
        v-if="mobile"
        :vounty="vounty"
        :editable="true"
        @upload="upload"
      >
        <template #prize>
          <currency-input
            v-model="prize"
            :currency="currency"
            :value-range="valueRange"
            class="prize-input"
          />
        </template>
      </vounty-card>
      <small-vounty-card
        v-if="!mobile"
        :vounty="vounty"
        :editable="true"
        @upload="upload"
      >
        <template #prize>
          <currency-input
            v-model="prize"
            :currency="currency"
            :value-range="valueRange"
            class="prize-input"
          />
        </template>
      </small-vounty-card>
      <v-card class="stripe-card">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <stripe-form
                ref="stripe"
                @token="stripeToken"
                @error="stripeError"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn class="svb" @click="startVounty">
        <span>Start Vounty</span>
      </v-btn>
    </template>
    <template #completeButton>
      <div />
    </template>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </flow-form>
</template>

<script>
import FlowForm, { QuestionModel, ChoiceOption, QuestionType, LanguageModel } from '@ditdot-dev/vue-flow-form'
import StripeForm from '../components/StripeForm'
import VountyCard from '../components/VountyCard'
import SVountyCard from '../components/SVountyCard'
import UploadService from '../services/upload'

export default {
  components: {
    'flow-form': FlowForm,
    'stripe-form': StripeForm,
    'vounty-card': VountyCard,
    'small-vounty-card': SVountyCard
  },
  middleware: 'auth',
  data () {
    return {
      image: '',
      prize: 0.0,
      file: null,
      description: '',
      completed: false,
      loading: false,
      currency: {
        prefix: '',
        suffix: '€'
      },
      valueRange: {
        min: 5
      },
      questions: [
        new QuestionModel({
          title: 'What is the vounty for?',
          subtitle: 'Describe in a short sentence what it is that you are looking for. Be specific, but also keep it brief. You will have a chance to provide more details in the next section.',
          placeholder: 'Name of the vounty...',
          type: QuestionType.Text,
          required: true
        }),
        new QuestionModel({
          title: 'How does one claim the vounty?',
          subtitle: 'Tell people how they can go about proving that the have accomplished the task. You should also provide any other pertinent details about the goal. Give background information, if needed.',
          placeholder: 'Description of the vounty...',
          type: QuestionType.Text,
          required: true
        })
      ],
      language: new LanguageModel({
        multipleChoiceHelpText: 'Choose as many as you like.'
      })
    }
  },
  async fetch () {
    await this.$store.dispatch('tag/read', {})
    const options = this.$store.state.tag.results
      .map(t => new ChoiceOption({ value: t.id, label: t.text }))
    this.questions.push(new QuestionModel({
      title: 'Where does the vounty fit?',
      subtitle: 'Give your vounty some tags, so that those interested can more easily find it.',
      type: QuestionType.MultipleChoice,
      allowOther: false,
      multiple: true,
      required: true,
      options
    }))
  },
  computed: {
    mobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return true
        default: return false
      }
    },
    vounty () {
      if (this.completed) {
        return {
          title: this.truncate(this.questions[0].answer, 100),
          subtitle: this.truncate(this.questions[1].answer, 250),
          tags: this.questions[2].answer.map(id => this.$store
            .state.tag.results.find(t => t.id === id)),
          prize: this.prize,
          image: this.image
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    onComplete (completed, questionList) {
      this.completed = completed
    },
    startVounty () {
      if (this.loading) return
      this.$refs.stripe.submit()
      this.loading = true
    },
    async stripeToken (token) {
      let image = ''
      if (this.file) {
        const links = await this.$store.dispatch('storage/link')
        image = await UploadService.uploadImage(this.file, links, this.maxSizeMB)
      }
      await this.$store.dispatch('vounty/start', {
        data: {
          token,
          amount: this.vounty.prize,
          title: this.vounty.title,
          subtitle: this.vounty.subtitle,
          tags: this.vounty.tags,
          image
        }
      }).then((data) => {
        this.$refs.stripe.clear()
        this.loading = false
        this.$router.push({
          path: '/vounty?id=' + data.id
        })
      })
    },
    stripeError (error) {
      // TODO: Handle error.
      this.loading = false
      throw error
    },
    upload (e) {
      if (e.target.files) {
        this.file = e.target.files[0]
        this.image = URL.createObjectURL(this.file)
      }
    },
    truncate (text, length) {
      if (text.length > length) {
        return text.substring(0, length - 3) + '...'
      } else return text
    }
  }
}
</script>

<style lang="scss" scoped>
.stripe-card {
  margin-top: 16px;
}

.prize-input {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  margin-right: 16px;
  text-align: right;
  word-break: keep-all;
}

.prize-input:focus {
  outline: none;
}

.final-title {
  font-size: 2.4em;
  font-weight: 900;
  line-height: 1.34;
  margin-bottom: 0;
}

.final-subtitle {
  font-size: 1.1em;
  font-weight: 400;
  margin-bottom: 32px;
  margin-top: 5px;
}

.svb {
  margin-top: 16px;
  padding: 0;
}
</style>
