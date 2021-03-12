<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '25px',
    }"
  >
    <div>
      <table
        :style="{
          margin: '0 auto',
          borderSpacing: 0,
          borderCollapse: 'collapse',
        }"
      >
        <tr v-for="(row, rowIdx) in grid" :key="`rowIdx-${rowIdx}`">
          <td
            v-for="(value, colIdx) in row"
            :key="`rowIdx-${rowIdx}-${colIdx}`"
            :style="{
              border: '1px solid grey',
              width: '25px',
              height: '25px',
            }"
          >
            {{ PLAYER_MAP[value] }}
          </td>
        </tr>
      </table>
    </div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '25px',
      }"
    >
      Winner: XXX
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PLAYER_MAP } from '../constants';

export default Vue.extend({
  data: () => ({ PLAYER_MAP }),
  props: {
    grid: {
      type: Array,
      required: true,
    },
  },
});
</script>
