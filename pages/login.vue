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
            id="password"
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
            id="confirmPassword"
            v-model="confirmPassword"
            :rules="rules.confirmPassword"
            prepend-icon="mdi-lock"
            name="confirmPassword"
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
      confirmPassword: '',
      tab: 0,
      valid: false,
      rules: {
        username: [v => !!v || 'Username is required'],
        email: [v => !!v || 'Email is required'],
        password: [v => !!v || 'Password is required'],
        confirmPassword: [v => !!v || 'Confirm your password']
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
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        return this.$router.push({ path: '/' })
      } catch (err) {
        this.$refs.form.reset()
        console.log(err)
      }
    },
    register () {
      if (this.password === this.confirmPassword) {
        try {
          return this.$store.dispatch('user/create', {
            data: {
              username: this.username,
              email: this.email,
              password: this.password
            }
          }).then(() => this.login())
        } catch (err) {
          this.$refs.form.reset()
          console.log(err)
        }
      } else {
        this.password = ''
        this.confirmPassword = ''
      }
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
