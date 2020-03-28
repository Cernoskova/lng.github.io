<template>
  <div id="events">
    <v-container>
      <h4 class="page-title text--secondary">Our Events</h4>
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="isLoading"
      ></v-progress-circular>
      <v-row v-if="docEvents.length > 0 && !isLoading">
        <v-col v-for="event in docEvents" :key="event.title" lg="4" md="4" sm="6" cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 16 : 2" outlined>
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              >
                <v-card-title>{{ event.title }}</v-card-title>
              </v-img>
              <v-card-subtitle>{{ event.type }}</v-card-subtitle>
              <v-card-text class="card-text">{{ event.description }}</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="compoundDetails()">More</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-alert type="error" v-if="isError()">
        {{ error.stack }}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Events',
  data() {
    return {
      events: [
        { name: 'lalalal', description: 'lelelellelelelel' },
        { name: 'asdfasdf', description: '4535345363' },
        { name: 'lalafwvfvasvxclal', description: 'qwetrefvdfvsd' },
        { name: 'grttnyunyhngh', description: 'i,imjmhjmuhj' },
      ],
      imgBasePath: '/assets/images/events/',
    };
  },
  methods: {
    isError() {
      return this.error instanceof Error;
    },
  },
  computed: {
    ...mapState({
      docEvents: (state) => state.events,
      isLoading: (state) => state.loading,
      error: (state) => state.error,
    }),
  },
  created() {
    this.$store.dispatch('getDocWithPapa');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1.page-title {
  font-weight: 400;
  font-size: 3em;
  text-align: center;
}
.break {
  word-break: break-all;
}
</style>
