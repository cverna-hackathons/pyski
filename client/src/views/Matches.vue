<template>
  <div>
    <h1>Matches</h1>
    <div class="notification" v-if="$apollo.queries.matches.loading">
      Loading matches...
    </div>
    <div v-if="matches">
      <MatchRow v-for="match in matches" :key="match.id" :match="match" />
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import MatchRow from '../components/MatchRow.vue';

interface MatchComponentData {
  delay?: ReturnType<typeof setTimeout>;
}
export default Vue.extend({
  data: (): MatchComponentData => ({
    delay: undefined,
  }),
  components: {
    MatchRow,
  },
  computed: {
    matchId(): string {
      return this.$route.params.matchId;
    },
  },
  apollo: {
    matches: {
      query: gql`
        query {
          matches {
            id
            playerA {
              name
            }
            playerB {
              name
            }
          }
        }
      `,
    },
    $subscribe: {
      matchFinished: {
        query: gql`
          subscription {
            matchFinished
          }
        `,
        result() {
          return this.reloadAfterResult();
        },
      },
    },
  },
  methods: {
    reloadAfterResult() {
      if (this.delay) {
        clearTimeout(this.delay);
      }
      this.delay = setTimeout(() => {
        this.$apollo.queries.matches.refetch();
      }, 400);
    },
  },
});
</script>
<style>
.notification {
  color: red;
  position: fixed;
  top: 1em;
  right: 5em;
  padding: 1em;
}
</style>
