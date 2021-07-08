<template>
  <div>
    <span id="info">
      <center>
        <span id="answer">FIRST TRY OUT !!!</span><span id="count"></span>
      </center>
    </span>
    <v-flex id="container1">
      <div id="FIRST_HALF"></div>
      <div id="SECOND_HALF"></div>
    </v-flex>
    <div id="buttons">
      <br />
      <center>
        
        <v-btn id="solve" rounded color="success" dark>
      SOLVE IT!
    </v-btn>
      </center>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<script>
export default {
  props: ["graph"],

  mounted() {
    console.log(this.graph);
    var s1 = new Set();
    for(var i=0;i<this.graph.edge_list.length;i++)
    {
        s1.add(this.graph.edge_list[i].from);
        s1.add(this.graph.edge_list[i].to);
    }

    var actual_size = s1.size;
    var index_map = new Map();
    
    var f=0;
    for(let item of s1)
    {
        index_map[String(item)] = f;
        f++;
    }

    for(let item of s1)
    {
        console.log(item + " " + index_map[item]);
    }

    const PERSONS =[];
    for(let item of s1)
    {
        PERSONS.push(String(item));
    }

    class BinaryHeap {
      constructor() {
        this.heap = [];
      }

      insert(value) {
        this.heap.push(value);
        this.bubbleUp();
      }

      size() {
        return this.heap.length;
      }

      empty() {
        return this.size() === 0;
      }

      //using iterative approach
      bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
          let element = this.heap[index],
            parentIndex = Math.floor((index - 1) / 2),
            parent = this.heap[parentIndex];

          if (parent[0] >= element[0]) break;
          this.heap[index] = parent;
          this.heap[parentIndex] = element;
          index = parentIndex;
        }
      }

      extractMax() {
        const max = this.heap[0];
        const tmp = this.heap.pop();
        if (!this.empty()) {
          this.heap[0] = tmp;
          this.sinkDown(0);
        }
        return max;
      }

      sinkDown(index) {
        let left = 2 * index + 1,
          right = 2 * index + 2,
          largest = index;
        const length = this.size();

        // console.log(this.heap[left], left, length, this.heap[right], right, length, this.heap[largest]);

        if (left < length && this.heap[left][0] > this.heap[largest][0]) {
          largest = left;
        }
        if (right < length && this.heap[right][0] > this.heap[largest][0]) {
          largest = right;
        }
        // swap
        if (largest !== index) {
          let tmp = this.heap[largest];
          this.heap[largest] = this.heap[index];
          this.heap[index] = tmp;
          this.sinkDown(largest);
        }
      }
    }

    let curr_data;
    var container1 = document.getElementById("FIRST_HALF");
    var container2 = document.getElementById("SECOND_HALF");
    var solve = document.getElementById("solve");
    var count = document.getElementById("count");
    var answer = document.getElementById("answer");

    const options = {
      edges: {
        arrows: {
          to: true,
        },
        labelHighlightBold: true,
        font: {
          size: 15,
        },
        width: 1,
        length: 200,
      },
      nodes: {
        font: "15px arial red",
        scaling: {
          label: true,
        },
        shape: "icon",
        icon: {
          face: "FontAwesome",
          code: "\uf508",
          size: 40,
          color: "black",
        },
      },
    };

    var network = new vis.Network(container1);
    network.setOptions(options);
    var network2 = new vis.Network(container2);
    network2.setOptions(options);
    var vis_data;
    var node_cnt = this.graph.node_count;
    var edge_list_temp = this.graph.edge_list;
    function createData() {
      const k = actual_size;
      console.log("node count is "+ k);
      let node_list = [];
      for (var i = 0; i < k; i++) {
        node_list.push({
          id: i + 1,
          label: PERSONS[i],
        });
      }
      let edge_list = [];
    
     for(var i=0; i<edge_list_temp.length;i++)
     {
         console.log("from: " + index_map[edge_list_temp[i].from]);
         console.log("to: " + index_map[edge_list_temp[i].to]);
         console.log("label: " + String(edge_list_temp[i].label) + "$");
         edge_list.push({
                from: index_map[edge_list_temp[i].from]+1,
                to: index_map[edge_list_temp[i].to]+1,
                label: String(edge_list_temp[i].label) + "$",
              });
     }    

      vis_data = {
        nodes: node_list,
        edges: edge_list,
      };
    }

    var createGraphFromInput = function () {
      createData();
      curr_data = vis_data;
      network.setData(vis_data);
      container2.style.display = "inline-block";
      req_count = 0;
      count.style.display = "none";
      answer.innerText = "FIRST TRY OUT !!!";
    };

    solve.onclick = function () {
      container2.style.display = "inline-block";
      count.style.display = "inline-block";
      network2.setData(solveData());
      answer.innerText =
        "MINIMUM NO.OF TRANSACTIONS REQUIRED FOR SETTLEMENT : ";
      console.log(req_count);
      count.innerText = req_count;
    };
    var req_count = 0;

    function solveData() {
      let data = curr_data;
      const sz = data["nodes"].length;
      const vals = Array(sz).fill(0);
      // Calculating net balance of each person
      for (let i = 0; i < data["edges"].length; i++) {
        const edge = data["edges"][i];
        vals[edge["to"] - 1] += parseInt(edge["label"]);
        vals[edge["from"] - 1] -= parseInt(edge["label"]);
      }

      const pos_heap = new BinaryHeap();
      const neg_heap = new BinaryHeap();

      for (let i = 0; i < sz; i++) {
        if (vals[i] > 0) {
          pos_heap.insert([vals[i], i]);
        } else {
          neg_heap.insert([-vals[i], i]);
          vals[i] *= -1;
        }
      }

      const new_edges = [];
      while (!pos_heap.empty() && !neg_heap.empty()) {
        const mx = pos_heap.extractMax();
        const mn = neg_heap.extractMax();

        const amt = Math.min(mx[0], mn[0]);
        const to = mx[1];
        const from = mn[1];

        new_edges.push({
          from: from + 1,
          to: to + 1,
          label: String(Math.abs(amt)) + "$",
        });
        vals[to] -= amt;
        vals[from] -= amt;

        if (mx[0] > mn[0]) {
          pos_heap.insert([vals[to], to]);
        } else if (mx[0] < mn[0]) {
          neg_heap.insert([vals[from], from]);
        }
      }

      let vis_data = {
        nodes: data["nodes"],
        edges: new_edges,
      };
      req_count = new_edges.length;

      return vis_data;
    }
     createGraphFromInput();
  },
};
</script>

<style scoped lang="scss">
#title1 {
  font-family: cursive;
  font-size: 30px;
  color: white;
}

body {
  height: 100%;
  background-color: #8964;
}

#question,
#info {
  width: 100%;
  text-align: center;
  font-size: x-large;
}

#count {
  color: red;
}

#navtext {
  font-family: cursive;
  font-size: 30px;
  color: white;
}

#FIRST_HALF {
  border: 5px solid #0286a1;
}

#SECOND_HALF {
  border: 5px solid #0286a1;
  display: inline-block;
}

#container1 {
  background-color: #bbe1f2;
  border: 2px solid #bbe1f2;
  margin: 0 auto;
  flex-direction: row;
}

#buttons {
  margin: auto;
}
</style>