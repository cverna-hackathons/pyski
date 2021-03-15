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
            <div
              v-if="isInteractive && value === 0"
              @click.prevent="handleCellClick(colIdx, rowIdx)"
              class="nextPlayerValue"
            >
              {{ PLAYER_MAP[nextValue] }}
            </div>
          </td>
        </tr>
      </table>
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
    isInteractive: Boolean,
    nextValue: Number,
  },
  methods: {
    handleCellClick(x: number, y: number) {
      console.log('handleCellClick', x, y);
    },
  },
});
</script>

<style>
.nextPlayerValue {
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: transparent;
}
.nextPlayerValue:hover {
  color: green;
  font-weight: bold;
}
</style>
