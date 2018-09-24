<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="projects"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">
          <v-btn icon class="mx-0" @click.native.stop="editItem(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <p class="text-xs-right mt-3">
      <v-btn color="primary" dark @click.native.stop="editItem({name: ''})">
        新規作成
        <v-icon right>add</v-icon>
      </v-btn>
    </p>

    <v-dialog v-model="edit" max-width="500px">
      <v-form ref="edit" v-model="valid" lazy-validation style="user-select: none">
        <v-card>
          <v-card-title>
            <span class="headline" v-if="!editTarget.id">新しいプロジェクト</span>
            <span class="headline" v-else>プロジェクト #{{ editTarget.id }} を編集</span>
          </v-card-title>

          <v-alert :value="editError" type="error">
            error: {{ editError }}
          </v-alert>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="名前" v-model="editTarget.name" required
                    :rules="[v => !!v || '必須項目です']" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="edit = false">キャンセル</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!valid" @click.native="submit">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script src="./project.ts" />
