<template>
  <div>
    <v-toolbar dark :color="black">
      <v-spacer></v-spacer>
      <div id="title1">CASH-FLOW-MINIMIZER-PROBLEM PROJECT</div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <center>
      <span id="question"
        >CAN YOU MINIMIZE THE SPLITWISE CASHFLOW IN THE GIVEN TRANSACTIONS
        NETWORK OF FRIENDS <i class="fas fa-user-tie"></i> ?</span
      >
    </center>
    <div v-if="g">
      <center>
        <span id="answer"
          ><h3>
            Enter No. of friends involved and Total No. of Transactions between
            them.
          </h3></span
        ><span id="count"></span>
      </center>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              v-model="friendCount"
              label="Friends-Count"
              placeholder="Friends-Count"
              outlined
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="transactionCount"
              label="Transactions-Count"
              placeholder="Transactions-Count"
              outlined
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <span v-for="index in Number(transactionCount)" :key="index">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field
                v-model="src[index]"
                label="Payer"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="des[index]"
                label="Payee"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="amount[index]"
                label="Transfer Amount"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </span>
      <v-btn class="ma-2" color="success" @click="createG()">
        Create-Graph
      </v-btn>
    </div>
    <div v-else>
      <v-container>
        <v-flex>
          <Graph v-bind:graph="retobj"></Graph>
        </v-flex>
      </v-container>
    </div>

    <v-btn @click="refresh()" rounded color="primary" dark>
      INPUT-NEW-GRAPH
    </v-btn>
  </div>
</template>

<script>
import Graph from "./Graph.vue";
//import axios from 'axios'
export default {
  name: "HelloWorld",
  props: {},
  components: {
    Graph,
  },
  data: () => ({
    friendCount: 0,
    transactionCount: 0,
    black: "black",
    src: [],
    des: [],
    amount: [],
    edge_list_temp: [],
    retobj: {},
    g: true,
  }),
  methods: {
    input() {
      console.log(Number(this.friendCount));
      console.log(Number(this.transactionCount));
    },
    refresh() {
      this.g = true;
      this.transactionCount = 0;
      this.edge_list_temp = [];
       this.src = []
      this.des = []
    this.amount = []

    },
    createG() {
      //var edge_list_temp = [];

      for (var i = 1; i <= this.transactionCount; i++) {
        //  this.edge_list_temp.push({from: this.src[i], to: this.des[i], label: this.amount[i] });
        var temp = {
          from: this.src[i],
          to: this.des[i],
          label: this.amount[i],
        };
        this.edge_list_temp.push(temp);
      }

      console.log(this.edge_list_temp);
      this.retobj = {
        node_count: this.transactionCount,
        edge_list: this.edge_list_temp,
      };
      this.g = false;
    },
  },
  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question,
#info {
  width: 100%;
  text-align: center;
  font-size: x-large;
}

#title1 {
  font-family: cursive;
  font-size: 30px;
  color: white;
}

body {
  height: 100%;
  background-color: #8964;
}

#count {
  color: red;
}

#navtext {
  font-family: cursive;
  font-size: 30px;
  color: white;
}
</style>
