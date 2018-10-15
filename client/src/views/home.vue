<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card>
          <v-container fill-height fluid>
            <v-layout wrap fill-height>
              <v-flex xs12>
                <span class="headline">プロジェクトごと</span>
              </v-flex>
              <v-flex>
                <Bar
                  :chartData="{labels: labels, datasets: projectWise}"
                  :options="options"
                  v-if="projectWise.length > 0" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-container fill-height fluid>
            <v-layout wrap fill-height>
              <v-flex xs12>
                <span class="headline">作業種別ごと</span>
              </v-flex>
              <v-flex>
                <Bar
                  :chartData="{labels: labels, datasets: categoryWise}"
                  :options="options"
                  v-if="categoryWise.length > 0" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./home.ts" />
