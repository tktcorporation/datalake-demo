<template>
  <div>
    <vue-good-table
      class="sortable-table"
      :columns="tableCols"
      :rows="tableRows"
      styleClass="vgt-table condensed striped"
      :pagination-options="{
                enabled: true,
                perPage: 10
            }"
      :sort-options="{
                enabled: true,
            }"
      :line-numbers="options ? options.lineNumbers : false"
      :max-height="options ? options.maxHeight : null"
      :fixed-header="options ? options.fixedHeader : false"
    >
      <template slot="emptystate">
        <!--This will show up when there are no rows-->
        no data
      </template>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'picture'">
          <img
            v-if="props.row.picture"
            class="rounded float-left user-list-image"
            :src="props.row.picture"
          >
          <img
            v-if="!props.row.picture"
            class="rounded float-left user-list-image"
            src="http://lorempixel.com/35/35"
          >
        </span>
        <span v-else-if="props.column.type == 'sparkline'">
          <spark-line :data="props.row[props.column.field]"></spark-line>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
// @see https://github.com/apertureless/vue-chartjs
import _ from 'lodash';
import moment from 'moment';
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import SparkLine from '../charts/SparkLine';

/**
 * @see https://xaksis.github.io/vue-good-table/guide/configuration/column-options.html#type
 */
export default {
    name: 'sortable-table',

    props: ['columns', 'rows', 'options'],

    components: {
        VueGoodTable,
        SparkLine
    },
    computed: {
        tableCols: function() {
            if (_.isEmpty(this.columns)) {
                return [];
            }
            return this.columns;
        },
        tableRows: function() {
            if (_.isEmpty(this.rows)) {
                return [];
            }
            // If we're passed an object then discard keys and convert to array
            else if (!_.isArray(this.rows)) {
                return _.toArray(this.rows);
            } else {
                return this.rows;
            }
        }
    }
};
</script>


<style lang="scss">
.sortable-table {
    .vgt-table {
        font-size: 14px;
    }

    .user-list-image {
        width: 20px;
        max-height: 20px;
    }

    .user-list-tags {
        margin-left: 40px;
        font-size: 12px !important;
    }
}
</style>
