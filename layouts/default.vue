<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon v-if="showDrawer" @click.stop="drawer = !drawer" />
      <v-app-bar-title v-if="showDrawer" class="wanted-title" v-text="'Vounty'" />
      <v-app-bar-title v-else class="wanted-title" style="margin-left: 26px;" v-text="'Vounty'" />

      <v-tabs v-if="!showDrawer" align-with-title optional>
        <v-tab to="/" nuxt class="bold-text">
          How it works
        </v-tab>
        <v-tab to="/discover" nuxt class="bold-text">
          Discover
        </v-tab>
        <v-tab to="/start" nuxt class="bold-text">
          Start a Vounty
        </v-tab>
      </v-tabs>

      <v-spacer />

      <div v-if="!showDrawer">
        <v-menu v-if="$auth.loggedIn" bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-avatar size="36">
                <v-img v-if="$auth.user.image" :src="$auth.user.image" />
                <div v-else class="v-text">
                  <p class="profile-symbol">
                    V
                  </p>
                </div>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item nuxt to="/profile">
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$auth.logout()">
              <v-list-item-content>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          :ripple="false"
          plain
          class="bold-text"
          nuxt
          to="/login"
        >
          Log in
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-if="showDrawer"
      v-model="drawer"
      temporary
      absolute
    >
      <v-list-item v-if="$auth.loggedIn">
        <v-list-item-avatar>
          <v-img v-if="$auth.user.image" :src="$auth.user.image" />
          <div v-else class="v-text" style="width: 100%;">
            <p class="profile-symbol">
              V
            </p>
          </div>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="$auth.loggedIn" />

      <v-list nav dense>
        <v-list-item-group>
          <v-list-item nuxt to="/">
            <v-list-item-icon>
              <v-icon>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>How it works</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/discover">
            <v-list-item-icon>
              <v-icon>mdi-compass</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Discover</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/start">
            <v-list-item-icon>
              <v-icon>mdi-creation</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Start a Vounty</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="$auth.loggedIn" nuxt to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="$auth.loggedIn" @click="$auth.logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else nuxt to="/login">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer app padless :height="footerHeight">
      <v-container>
        <v-row>
          <v-col cols="12">
            <span class="bold-text">
              &copy;&nbsp;&nbsp;Vounty&nbsp;&nbsp;|&nbsp;
            </span>
            <NuxtLink to="/terms" class="underlined">
              Terms of Use
            </NuxtLink>&nbsp;|&nbsp;
            <NuxtLink to="/privacy" class="underlined">
              Privacy Policy
            </NuxtLink>&nbsp;|&nbsp;
            <NuxtLink to="/cookies" class="underlined">
              Cookie Policy
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    footerHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 56
        case 'sm': return 56
        default: return 64
      }
    },
    showDrawer () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wanted-title {
  font-family: 'Rye', sans-serif;
  font-size: 35px;
  min-width: 135px;
}

.profile-symbol {
  font-size: 25px;
  margin-top: 16px;
}
</style>
