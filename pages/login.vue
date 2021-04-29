<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :rules="rules.username"
            prepend-icon="mdi-account"
            name="username"
            label="Username"
            type="text"
            @keyup.enter="submit"
          />
          <v-text-field
            v-if="tab === 1"
            v-model="email"
            :rules="rules.email"
            prepend-icon="mdi-email"
            name="email"
            label="Email"
            type="email"
            @keyup.enter="submit"
          />
          <v-text-field
            v-model="password"
            :rules="rules.password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            type="password"
            @keyup.enter="submit"
          />
          <v-text-field
            v-if="tab === 1"
            v-model="repassword"
            :rules="rules.repassword"
            prepend-icon="mdi-lock"
            name="repassword"
            label="Confirm Password"
            type="password"
            @keyup.enter="submit"
          />
          <v-btn
            v-if="tab === 0"
            :disabled="!valid"
            class="login-btn"
            @click="submit"
          >
            Log In
          </v-btn>
          <v-btn
            v-if="tab === 1"
            :disabled="!valid"
            class="login-btn"
            @click="submit"
          >
            Register
          </v-btn>
          <div class="login-text">
            <p v-if="tab === 0">
              Don't have an account? <span class="login-link" @click="tab = 1">Register</span>
            </p>
            <p v-if="tab === 1">
              Already have an account? <span class="login-link" @click="tab = 0">Log in</span>
            </p>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  auth: 'guest',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      repassword: '',
      tab: 0,
      valid: false,
      loading: false,
      confirm: {
        username: false,
        email: false,
        password: false,
        repassword: false
      },
      rules: {
        username: [
          v => !!v || 'Username is required',
          v => (this.confirm.username = !!v)
        ],
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'The email is not valid',
          v => (this.confirm.email = !!v && /.+@.+\..+/.test(v))
        ],
        password: [
          v => !!v || 'Password is required',
          v => v !== this.username || 'The password can\'t match your username',
          v => v !== this.email || 'The password can\'t match your email',
          v => v.length > 8 || 'The password must be 8 characters or longer',
          v => isNaN(v) || 'The password can\'t be only numbers',
          v => (this.confirm.password = !!v && v !== this.username &&
            v !== this.email && v.length > 8 && isNaN(v))
        ],
        repassword: [
          v => !!v || 'Confirm your password',
          v => v === this.password || 'The passwords don\'t match',
          v => (this.confirm.repassword = !!v && v === this.password)
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
      if (this.tab === 0) {
        this.login()
      } else if (this.tab === 1) {
        this.register()
      }
    },
    async login () {
      if (!this.confirm.username ||
        !this.confirm.password) return
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        this.loading = false
        return this.$router.push({ path: '/' })
      } catch (err) {
        this.$refs.form.reset()
        this.loading = false
        console.log(err)
      }
    },
    register () {
      if (!Object.values(this.confirm)
        .every(x => x)) return
      try {
        this.loading = true
        return this.$store.dispatch('user/create', {
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        }).then(async () => {
          await this.login()
          this.loading = false
        })
      } catch (err) {
        this.$refs.form.reset()
        this.loading = false
        console.log(err)
      }
      this.password = ''
      this.repassword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  margin-top: 8px;
  width: 100%;
}

.login-text {
  margin-top: 16px;
  text-align: right;
}

.login-link {
  cursor: pointer;
  font-weight: bold;
}
</style>
