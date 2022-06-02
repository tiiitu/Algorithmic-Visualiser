import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithm/dijkstra';
import './PathFindingVisualizer.css';

const START_NODE_ROW = Math.floor(Math.random() * (19 - 0 + 1)) + 0;
const START_NODE_COL = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
const FINISH_NODE_ROW = Math.floor(Math.random() * (19 - 0 + 1)) + 0;
const FINISH_NODE_COL = Math.floor(Math.random() * (49 - 0 + 1)) + 0;

export default class PathfindingVisualizer extends Component {

  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      steps: 0
    };
  }


  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.setState({ steps: (nodesInShortestPathOrder.length === 1 && !nodesInShortestPathOrder[0].isVisited) ? -1 : nodesInShortestPathOrder.length });
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  home() {
    window.location.reload();
  }

  render() {
    const { grid, mouseIsPressed, steps } = this.state;
    // const {x}=this.nodesInShortestPathOrder.length;
    // console.log(x);
    return (
      <>
        <div>
          <h1 className="heading">Dijkstra's Algorithm</h1>
          <p className="text">Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph.

            It differs from the minimum spanning tree because the shortest distance between two vertices might not include all the vertices of the graph.</p>
          <h1 className="heading1">How Dijkstra's Algorithm works</h1>
          <p className="text">Dijkstra's Algorithm works on the basis that any subpath B to D of the shortest path A to D between vertices A and D is also the shortest path between vertices B and D.</p>
          <img className="zoom" src="/Images/example.png" alt=""/>
          <p className="text">Djikstra used this property in the opposite direction i.e we overestimate the distance of each vertex from the starting vertex. Then we visit each node and its neighbors to find the shortest subpath to those neighbors.

The algorithm uses a greedy approach in the sense that we find the next best solution hoping that the end result is the best solution for the whole problem.</p>
<h1 className="heading1">Example of Dijkstra's algorithm</h1>
<h2 className="text">It is easier to start with an example and then think about the algorithm.</h2>
<img className="zoom" src="/Images/step-1.png" alt=""/>
<img className="zoom" src="/Images/step-2.png" alt=""/>
<img className="zoom" src="/Images/step-3.png" alt=""/>
<img className="zoom" src="/Images/step-4.png" alt=""/>
<img className="zoom" src="/Images/step-5.png" alt=""/>
<img className="zoom" src="/Images/step-6.png" alt=""/>
<img className="zoom" src="/Images/step-7.png" alt=""/>
<img className="zoom" src="/Images/step-8.png" alt=""/>
<h1 className="heading1">Djikstra's algorithm pseudocode</h1>
<p className="text">We need to maintain the path distance of every vertex. We can store that in an array of size v, where v is the number of vertices.We also want to be able to get the shortest path, not only know the length of the shortest path. For this, we map each vertex to the vertex that last updated its path length.</p>
<p className="text">Once the algorithm is over, we can backtrack from the destination vertex to the source vertex to find the path.A minimum priority queue can be used to efficiently receive the vertex with least path distance.</p>
<img className="zoom" src="/Images/pseudo.png" alt=""/>
<h1 className="heading1">Dijkstra's Algorithm Complexity</h1>
<h4 className="text">Time Complexity: O(E Log V)</h4>
<h4 className="text">Space Complexity: O(V)</h4>
<p className="text">where, E is the number of edges and V is the number of vertices.</p>
<h1 className="heading1">Dijkstra's Algorithm Applications</h1>
<ol>
  <li className="text">To find the shortest path</li>
  <li className="text">In social networking applications</li>
  <li className="text">In a telephone network</li>
  <li className="text">To find the locations in the map</li>
</ol>
<h1 className="heading">VISUALIZING ALGORITHM:</h1>
        </div>
        <button onClick={() => this.home()}
          className="reset">
          Click to reload!</button>
        <button onClick={() => this.visualizeDijkstra()}
          className="suryansh">
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="steps"> steps required to reach the target : {steps}</div>

      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};