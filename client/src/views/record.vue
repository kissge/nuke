<template>
  <v-layout row>
    <v-flex sm12>
      <v-card>
        <v-list class="superwide" v-if="items.length > 0">
          <v-list-tile>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="month"
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="month"
                readonly
                prepend-icon="calendar_today"
                full-width
                solo
                flat
                class="display-1 ma-2"
              ></v-text-field>
              <v-date-picker v-model="month" type="month" locale="ja" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">キャンセル</v-btn>
                <v-btn flat color="primary" @click="updateQuery()">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-spacer />

            <v-menu offset-y v-if="user && user.isAdmin && selectedUser">
              <v-btn slot="activator" large>
                <v-avatar size="24" class="mr-4">
                  <img :src="selectedUser.avatar">
                </v-avatar>
                {{ selectedUser.name }}
              </v-btn>
              <v-list>
                <v-list-tile v-for="(nuser, uindex) in users"
                  :key="uindex"
                  @click="updateQuery(nuser.id)">
                  <v-list-tile-avatar>
                    <v-avatar size="24" class="mr-2">
                      <img :src="nuser.avatar">
                    </v-avatar>
                  </v-list-tile-avatar>
                  <v-list-tile-title>
                    {{ nuser.name }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <v-btn large color="primary" @click="save" :disabled="!editable() || modifiedCount() == 0">
              {{ modifiedCount() }}件を保存
              <v-icon class="ml-3">save</v-icon>
            </v-btn>
          </v-list-tile>
          <template v-for="(item, index) in items">
            <v-divider v-if="item.dow" :key="index" />
            <v-list-tile :key="month + index" v-bind:class="{ modified: item.modified, invalid: item.valid === false }" v-if="item.dow || !item.empty || editable()">
              <v-list-tile-avatar>
                <template v-if="item.dow">
                  <span class="headline">{{ item.date.slice(-2) }}</span><br>{{ item.dow }}
                </template>
              </v-list-tile-avatar>
              <v-list-tile-content v-if="editable() || !item.empty">
                <div style="width: 100%; display: flex; flex-wrap: wrap;">
                  <div>
                    <v-text-field mask="time" v-model="item.duration" style="width: 3em" @change="modify(item)" :readonly="!editable()" />
                  </div>
                  <div style="flex-grow: 1" class="mx-2">
                    <v-text-field placeholder="作業内容" v-model="item.title" @change="modify(item)" :readonly="!editable()" />
                  </div>
                  <v-menu offset-y>
                    <v-btn slot="activator" depressed :color="color(projectName(item.project))">
                      <span class="btn-ellipsis">
                        {{ projectName(item.project) }}
                      </span>
                      <v-icon>dvr</v-icon>
                    </v-btn>
                    <v-list v-if="editable()">
                      <v-list-tile v-for="(project, pindex) in projects"
                        :key="pindex"
                        @click="item.project = project.id; modify(item)">
                        <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                  <v-menu offset-y>
                    <v-btn slot="activator" depressed :color="color(categoryName(item.category))">
                      <span class="btn-ellipsis">
                        {{ categoryName(item.category) }}
                      </span>
                      <v-icon>category</v-icon>
                    </v-btn>
                    <v-list v-if="editable()">
                      <v-list-tile v-for="(category, cindex) in categories"
                        :key="cindex"
                        @click="item.category = category.id; modify(item)">
                        <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                  <v-btn icon :disabled="item.empty && !item.modified" @click="deleteItem(item)" v-if="editable()">
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </div>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <Nekomimi v-else />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="./record.ts" />
<style>
  .btn-ellipsis {
    width: 6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .superwide .v-list__tile {
    height: auto !important;
  }

  .modified {
    background-color: #bce3f8;
  }

  .invalid {
    background-color: #f8bce3;
  }
</style>
