<template>
  <v-container id="nonsense" fluid fill-height grid-list-xl>
    <v-layout v-bind="binding()">
      <v-flex>
        <v-container class="display-4 white--text" fill-height justify-center>
          Nuke
        </v-container>
      </v-flex>
      <v-flex>
        <v-container fill-height>
          <a href="/nuke/auth/google" style="width: 100%">
            <img src="@/assets/btn_google_signin_light_normal_web@2x.png" style="width: 100%">
          </a>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./login.ts" />
<style scoped>
  #nonsense {
    background-image: url(https://picsum.photos/500/1000/?random&blur);
    background-size: cover;
  }
</style>
