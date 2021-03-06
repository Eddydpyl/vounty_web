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
        Below is a preview of how your vounty would look. You can add an image to the vounty by clicking on it. You can also click on the prize money to change how much you would like to contribute to kick things off. The minimum amount is 5€. Below the vounty preview, you can add a more complete description, and your credit card information. It is not stored in our database, nor shared with any other third party, and only used to process the payment through Stripe.
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
      <tiptap-input
        v-model="description"
        placeholder="Here you can provide as much information as you like, and link to relevant websites."
        class="mt-4"
      />
      <v-card class="mt-4">
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
      <v-btn class="mt-4" @click="startVounty">
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
import TiptapInput from '../components/TiptapInput'
import UploadService from '../services/upload'

export default {
  components: {
    'flow-form': FlowForm,
    'stripe-form': StripeForm,
    'vounty-card': VountyCard,
    'small-vounty-card': SVountyCard,
    'tiptap-input': TiptapInput
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
          subtitle: 'Describe in a short sentence what it is that you are looking for. Be specific, but also keep it brief. You will have a chance to provide more details in a moment.',
          placeholder: 'Name of the vounty...',
          type: QuestionType.Text,
          maxLength: 100,
          required: true
        }),
        new QuestionModel({
          title: 'How does one claim the vounty?',
          subtitle: 'Tell people how they can go about proving that they have accomplished the task. Keep it short and to the point. There\'s still one more, bigger field for extra details.',
          placeholder: 'Short description of the vounty...',
          type: QuestionType.Text,
          maxLength: 250,
          required: true
        })
      ],
      language: new LanguageModel({
        multipleChoiceHelpText: 'Choose as many as you like.'
      })
    }
  },
  async fetch () {
    await this.$store.dispatch('tag/read', {
      params: {
        page_size: 100
      }
    })
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
  head () {
    return {
      title: 'Start a Vounty'
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
    },
    vounty () {
      if (this.completed) {
        return {
          title: this.questions[0].answer,
          subtitle: this.questions[1].answer,
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
          description: this.description,
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
