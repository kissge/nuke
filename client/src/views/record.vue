<template>
  <v-layout row>
    <v-flex sm12>
      <v-card>
        <v-list class="superwide">
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
                <v-btn flat color="primary" @click="$router.push({ name: 'record', params: { year: month.substr(0, 4), month: month.slice(-2) } })">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-list-tile>
          <template v-for="(item, index) in items">
            <v-divider v-if="item.dow" :key="index" />
            <v-list-tile :key="month + index">
              <v-list-tile-avatar>
                <template v-if="item.dow">
                  <span class="headline">{{ item.date.slice(-2) }}</span><br>{{ item.dow }}
                </template>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <div style="width: 100%; display: flex; flex-wrap: wrap;">
                  <div>
                    <v-text-field mask="time" v-model="item.duration" style="width: 3em" />
                  </div>
                  <div style="flex-grow: 1" class="mx-2">
                    <v-text-field placeholder="作業内容" v-model="item.title" />
                  </div>
                  <v-menu offset-y>
                    <v-btn slot="activator" depressed :color="color(item.project, 1)">
                      <span class="btn-ellipsis">
                        {{ projectName(item.project) }}
                      </span>
                      <v-icon>dvr</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="(project, pindex) in projects"
                        :key="pindex"
                        @click="item.project = project.id; $forceUpdate()">
                        <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                  <v-menu offset-y>
                    <v-btn slot="activator" depressed :color="color(item.category, 2)">
                      <span class="btn-ellipsis">
                        {{ categoryName(item.category) }}
                      </span>
                      <v-icon>category</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="(category, cindex) in categories"
                        :key="cindex"
                        @click="item.category = category.id; $forceUpdate()">
                        <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                  <v-btn icon @click="save(item)">
                    <v-icon color="primary">save</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </div>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
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
</style>
