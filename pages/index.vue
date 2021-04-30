<template>
  <v-container style="margin-top: 28px;">
    <v-row align="center">
      <v-spacer />
      <v-col cols="12" sm="8" style="text-align: center;">
        <v-icon class="large-icon wanted-text">
          $
        </v-icon><br><br>
        <h1 class="wanted-text">
          Virtual bounties
        </h1>
        <p><b>Vounty</b> is the place where you can create, fund and lay claim to virtual bounties (known as vounties). A bounty is a payment or reward, often offered by a group, as an incentive for the accomplishment of a particular task. A vounty is the same, but online and democratized. Anyone can start, fund and claim vounties.</p>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row align="center">
      <v-spacer />
      <v-col cols="12" sm="8" style="text-align: center;">
        <v-icon class="large-icon">
          mdi-rocket
        </v-icon><br><br>
        <h1>Start a <span class="wanted-text">vounty</span></h1>
        <p>Is there something you would like people to work on? It can be anything, from big, lofty goals like eradicating cancer, to smaller, more personal tasks, like translating a foreign novel you would love to read. Do you believe others would also want to contribute to that goal? Then it's perfect vounty material.</p>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row align="center">
      <v-spacer />
      <v-col cols="12" sm="8" style="text-align: center;">
        <v-icon class="large-icon">
          mdi-heart
        </v-icon><br><br>
        <h1>Fund a <span class="wanted-text">vounty</span></h1>
        <p>Have you found some goal you would like to contribute to? Putting money towards growing a vounty shows people where your interests lay, and helps motivate others to work on that goal. The bigger the vounty, the more people will try to claim it, and the sooner the goal will be achieved.</p>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row align="center">
      <v-spacer />
      <v-col cols="12" sm="8" style="text-align: center;">
        <v-icon class="large-icon">
          mdi-lock-open
        </v-icon><br><br>
        <h1>Claim a <span class="wanted-text">vounty</span></h1>
        <p>Do you have the skills to work towards the goal of a vounty? Maybe you are already doing so? Anyone can make a submission to claim the prize, and those that have contributed to the vounty will decide if they deserve to get the money. Contributions are non-refundable, so you can rest easy the money will be there.</p>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'How it Works'
    }
  }
}
</script>

<style lang="scss" scoped>
.wanted-text {
  font-family: 'Rye', sans-serif;
  font-weight: normal;
}

.large-icon {
  font-size: 120px;
}
</style>
