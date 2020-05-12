<template>
  <div id="events">
    <v-container>
      <h1>Another test</h1>
      <v-row align="center">
        <v-col lg="3" md="4" sm="6">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 16 : 2" outlined>
              <v-list-item three-line class="primary">
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title class="headline mb-1">UCI asdf</v-list-item-title>
                  <v-list-item-subtitle>Inchi Key: asdfasd</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text class="card-text">alsdjflkajsdlfkjaslkdjf</v-card-text>
              <v-card-actions>
                <span>Sources: asodflasdfhlsjah</span>
                <v-spacer />
                <v-btn color="primary" @click="compoundDetails()">More</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Events',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
