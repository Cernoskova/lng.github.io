/* eslint-disable import/no-dynamic-require */
<template>
  <div id="events" class="primary">
    <v-container class="primary">
      <!-- Event Detail Dialog -->
      <v-dialog v-model="eventDialog">
        <v-card class="accent">
          <v-img
            class="white--text align-end"
            max-height="450px"
            :src="`${imgBasePath}${currentEvent.photoPath}`"
          >
            <v-card-title class="break">{{ currentEvent.title }}</v-card-title>
          </v-img>
          <v-card-subtitle class="mt-4 white--text">
            <v-row>
              {{ currentEvent.type }}
              <v-spacer/>
              <v-img
              :aspect-ratio="16/9"
              :max-width="60"
              :src="`/v/assets/images/flat/64/${currentEvent.country}.png`"
              />
            </v-row>
          </v-card-subtitle>
          <v-list color="accent">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="white">mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle class="white--text">
                {{ currentEvent.country }}, {{currentEvent.city}}, {{ currentEvent.venue }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="white">mdi-calendar-month</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle class="white--text">
                {{ currentEvent.dates }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="currentEvent.client">
              <v-list-item-icon>
                <v-icon color="white">mdi-factory</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle class="white--text">
                {{ currentEvent.client }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <!-- <v-card-text v-if="currentEvent.description" class="card-text">
            {{ currentEvent.description }}
          </v-card-text> -->
          <v-card-actions>
            <v-btn color="primary block" v-if="currentEvent.photoGallery">
              <a class="white--text" :href="currentEvent.photoGallery" target="_blank">
                Photo Gallery
              </a>
            </v-btn>
            <v-btn color="primary block" v-if="currentEvent.meetingUrl">
              <a class="white--text" :href="currentEvent.meetingUrl" target="_blank">
                Meeting Url
              </a>
            </v-btn>
            <v-spacer />
            <v-btn color="primary block" @click="eventDialog = false">
             Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END of Event Detail Dialog -->
      <h3 class="page-title secondary--text">Our Events</h3>
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="isLoading"
      ></v-progress-circular>
      <h4 class="white-text">Upcoming events</h4>
      <v-row v-if="docEvents.length > 0 && !isLoading">
        <v-col v-for="event in docEvents" :key="event.title" lg="4" md="4" sm="6" cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              @click="displayEventDetails(event)"
              class="event accent"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                :src="`${imgBasePath}${event.photoPath}`"
              >
                <v-card-title class="break">{{ event.title }}</v-card-title>
              </v-img>
              <v-card-subtitle>
                <v-row class="px-2 white--text">
                  {{ event.type }} - {{ event.city }}
                  <v-spacer/>
                  <v-img
                  :aspect-ratio="16/9"
                  :max-width="45"
                  :src="`/v/assets/images/flat/64/${event.country}.png`"
                  />
                </v-row>
              </v-card-subtitle>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="white">mdi-calendar-month</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="white--text">{{ event.dates }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon >
                  <v-icon color="white">mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="white--text">
                  {{ event.attendees }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <h4 class="white-text">Past events</h4>
      <v-row v-if="pastEvents.length > 0 && !isLoading">
        <v-col v-for="event in pastEvents" :key="event.title" lg="4" md="4" sm="6" cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              @click="displayEventDetails(event)"
              class="event secondary"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                :src="`${imgBasePath}${event.photoPath}`"
              >
                <v-card-title class="break">{{ event.title }}</v-card-title>
              </v-img>
              <v-card-subtitle>
                <v-row class="px-2 white--text">
                  {{ event.type }} - {{ event.city }}
                  <v-spacer/>
                  <v-img
                  :aspect-ratio="16/9"
                  :max-width="45"
                  :src="`/v/assets/images/flat/64/${event.country}.png`"
                  />
                </v-row>
              </v-card-subtitle>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="white">mdi-calendar-month</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="white--text">{{ event.dates }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon >
                  <v-icon color="white">mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="white--text">
                  {{ event.attendees }}
                </v-list-item-subtitle>
              </v-list-item>
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
      imgBasePath: '/v/assets/images/events/',
      currentEvent: {},
      eventDialog: false,
      currentTime: {},
    };
  },
  methods: {
    isError() {
      return this.error instanceof Error;
    },
    displayEventDetails(event) {
      this.currentEvent = event;
      this.eventDialog = true;
    },
  },
  computed: {
    ...mapState({
      docEvents: (state) => state.events,
      pastEvents: (state) => state.pastEvents,
      isLoading: (state) => state.loading,
      error: (state) => state.error,
    }),
  },
  created() {
    this.currentTime = new Date();
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
  word-break: break-word;
}
.event {
  transition: opacity .4s ease-in-out;
}
.event:not(.on-hover) {
  opacity: 1;
}
.event.on-hover {
  opacity: 0.6;
}
</style>
