<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      clipped
      mobile-break-point="1025"
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left style="user-select: none" color="primary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Nuke</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/profile" tag="div">
        <v-chip close v-on:input="logout">
          <v-avatar size="35">
            <img src="http://i.pravatar.cc/300">
          </v-avatar>
          Trevor Hansen
        </v-chip>
      </router-link>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script src="./App.ts" />

<style>
  .v-toolbar .v-chip .v-chip__content {
    cursor: pointer;
  }
</style>
