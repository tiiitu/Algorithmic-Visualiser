Path Finding Visualizer (Dijkstra Algorithm)
 
Technology used: React

1.)First of all I have deleted everything that was rendering in the app.js file that i have created my own components my path finding visualizer components.Hence i imported it and rendered it in app.js file.

2.)Till yet my path finding visualizer component is only simple react component. I am not going to use any hooks and functional components. It doesn't have any state.

3.)I've created a couple of css files.

4.) task 1: we have to create grid on page. now , i have created a bunch of nodes. Then we are iterating through every row and column.(Firstly i was confused whether i should use the html table components or not?)

5.)task 2: we will start visualising with css , the start node and the end node. first we will create the structure of node (what a node looks like).Node will have few things like a row and a column, isvisited property,etc.

6.)I have added a start node and end node. IN path finding visiualizer , i set the start node and finish node. I have created the object 'currentNode' for every node, where i say isStart is only true if row is 10 and col is 5 where isFinish is only true only true if row is 10 and col is 45.After this we are rendering this nodes where i have passed the properties of isStart and isFinish based on the node.


7.)now in node component, we set the ternery conditions , that depicts if we have isfinish then we gonna have extra class called node-finsih(having property of background color red) and if we are a node start then we gonna have extra class node-start (having property of background color green).


7.)task 3:(Implementing dijkstra-->weighted algorithm, directed graph). Dijkstra algorithm is a weighted algo. that means if there are certain parts of the path that you tell the algorithm , that you don't wannna go through that parts because it is weighted. (In real life example , heavy traffic area in google maps. Dijkstra algo can use this information to compute the shortest path.)

8.)now we have one more folder algorithms which is not going to be a react component and in it i created dijkstra.js file .Basic working of algo: You start with start node forgetting about target node. for every node on the graph (having distance of infinity to our starting node.), now we gonna grab all its direct neigbors (up down left right)and update their distance for our neighbors they're at the distance of 1 from our starting node and after this we gonna pick closest of neighbors and then we will again update the distance of neighbors. 

9.)working of code: in function of dijkstra we have grid, start node, targetnode as parameters. formed conditions for edge cases.Now we have set the distance infinity of every single node because you cannot reach all the nodes excpet the start node(start node is at the distance of zero) then we are picking the closest node of all the nodes to visit next.In loop first we'll visit node then we are updating all of the neighboring nodes.Now these node have a distance of whatever my current distance +1. Now, the node which i just visited will be eliminated it. now ,we'll grab closest node amoung the remaining node and all of them is at a distance of infinity except four of them that are at a distance of one so you pick one of the four and keep doing this process . we can use heap for keeping the track of minimum distance but we are not using that here. so we are using array of unvisited nodes and sorting the array every time. after all this we gonna come to that closest node is finish node. Hence we are done with algorithm.

10.)task 4: Handling the animations.
now, we have added the dijkstra's algorithm button with an onclick handler that will call the visualize dijkstra's method. then we've done some refactoring in the file so we added the method "getInitialGrid" to get the initial grid.I also renamed the nodes in our state to be grid instead of nodes.
Then we have added the 'create node method' that takes column and and a row as a parameters , adds some bunch of the properties that we might be required later.Also i have created the constants for the rows and columns of start and finish nodes.

11.)some changes in djakstra.js : 
in method dijkstra we have made this method to return an array of visited node in the order that we have visited them. so basically after every closest node , i just append the closest node to this array of visited nodes in order and finally at the very end we reach the finish node , then we return this array and this was done because we want to animate the nodes in array in the order that we visited them.

12.)BUG REPORTED: why my closest node's value is showing 1000 ? It was showing because i was doing unvisitedNodes.unshift (unshifts add the value to an array ) instead we should do .shift this will pop the value from front of the array.

13.)Animating them: we are animating an ordered array of the nodes that we've visited in order. so next our task is that we will be iterate through them and sort them  asynchronicity and set timeout in javascript. we gonna change the state in time span of 0.5 sec on each node and see if i will be successfull in animating them or not. 

14.) In node component , we will set some conditions like if node is animated then change the colour.Now, if we click on the button we called visualize dijkstra which called the dijkstra's algorithm which will give us the array of the visited nodes(in order).Then we call animated dijkstra function that goes through all the nodes we have visited in order.this depicts that for every node we are going to new node and then we mark that one as isisited , then we will update the state which is our grid with our new node.Also we are setting the settimeout of 100 ms. With delay f 100ms we update the state with that new node as visited which is gonna rerender everything and we pass for every node isVisited property and them we say if it is visited then change the color to blue (with help of the class node-visited) .

BUG REPORTED: All were apprearing Blue. 
Solution : We need to delay the set time out like multiply 100ms by the index of our current node 

15.)Changing the way we're updating the state (isn't really bad it is because we are doing so many state updates that has to rerender so much stuff ) ..failed.

16.)task 5: Making the walls by clicking and dragging accross the grid and then at end iff really we need to we'll refactor.

17.)Implement the functionality to create wall on the grid so when you click on the node it will turn into the wall and turn back into the normal node if it is already a wall also when click and drag you will be able create walls.Inorder to implement this i've created three mouse event listeners and on mouse down ,on mouse enter , on mouse up which we are calling in node file on node div.


18.) when you press your mouse button , now when you release it that's onClick (when you press and release) on mouse down, when you press and wanna have wall then on up happen when you release . so onclick merges mouse up and mouse down . mouse enter is just kind of hovering above an element whenever you mouse sort of enter the element area , event listenner is called ,this will useful when we drag our mouse right to create the walls. these methods are defined in the path finding visualizer file.

19.)HandlemouseDown : it will get new grid where node at the given row and column get toggled between a wall and not a wall, it also set bool IsMousePressed true because we only want to make those nodes walls that we enter . humlog sirf use samay wall banan chahte h jis samay click hua ho. hover karte samay humlog wall nhi bnana chahte hai.

20.)HandlemouseUp: once you release mouse is no longer pressed.

Bug : walls are not working.

21.)add condition : if(closestNode.isWall) continue;

Problem: Handling the case where we can not reach the target node.

22.)Made some changes in condition:
if(closestNode.distance==Infinite)//no neighbors left, we are trapped in wall.
Instead of return false, return the array of visitedNodeInOrder.

23.)task 6: making visulizer prettier by adding legitimate styles and animations .

Bug: Animation is lagging

Solution: Instead of updating the states in react in the set timeout(every 20 ms)  which was cauing the entire Dom to rerender (entire grid to rerender) instead we grab the individual element , upadating the class of the element to node visited.

24.) task 7:Building the path.

We renamed the updateNeighbors method in dijkstra to updateUnvisitedNeighbors , so I am getting the unvisited neighbors , i have re added the visited marks in code.That means where explore a node we marks it isVisited. getUnvisitedNeighbors is exactly same but at very end it will filter the neighbor by the neighbors by those that are unvisited and then when we are updating the eighbors with an distance we mark them with previous node , that is the current node that we're at and this should eventually give us the shortest path. Even when we update a neighbor from multiple different nodes ,it is working!!! 

Once we have the visited node in the order from dijkstra , we can call another node to get nodes in the shortest path order starting at the finsh node and making our way back.

getNodeInShortestPathOrder: this method help traversing backwards through previous node (feels like a linkedlist). 
In animatedDijkstra :

we add condition:
if(i==visitedNodesInOrder.length){
    setTimeouts(()=>{
        this.animateShortestPath(nodeInShortestPathOrder) ;
    },i*10);
}

animateShortestPath(NodeInShortestPathOrder){
    for(int i=0;i<NodeInShortestPathOrder;i++){
        setTimeouts(()=>{
            const node=NodeInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-{node.col}`).className='node node-visited';
    },i*10)
    }
}

25.)Summary:
node.jsx: this contains 3 mouse handlers (just for the walls) and these are passed down from the parent component(path finding visulizer component) and we have also defined some booleans that help us determine what class to put (node-start,node-finish,etc). One thing to note we have to id(id=(`node=${row}-${col}`)) if we want to access this node with document.getElement by Id.We can also use react ref here.

node.css : straight forward.

dijkstra.js: we have written dijkstra algo here. It is all about assigning a distance to all of the node in our grid and having distance infinite except startNode at 0 and saying at any point in time , what is closest node to me.we have maintained array of unVisited node && keep sorting. when we visit a node we mark it as visited and then we'll updates its neighbors to see which one is closest and that we also keep track of the previous neighbors we were at then we have method 'getnodesInshortestPathOrder' that will backtracks from the finish node to the starting node . 

PathFindingVisualizer.jsx: We are keeping the track of the grid in our state . we initialize at the begining , you can read function here 'GetInitialGrid' that initializes, its basically just hard coding the number of rows and column and creating nodes out of all of them and our nodes are structured in createNode , they are having a column , row and they have a distance , isVisited , pointer to the previous node ,etc . we also have functions that handles a mouse event.

when mouse is down , we are updating mousePressed to be true and we toggle the nodes is wall status same as for mouse enter but if the mouse is already pressed meaining that we're dragging walls and then we click the button to visiualize the  dijkstra , we have function 'animatedDijkstra' , first it calls the dijkstra's method and passes the grid ,startNode,finishNode then we are animating the dijkstra , we grab the return value of VisitedNodesInOrder , we have also set the settimeout where we say like in every 10 ms animate the node and to animate we don't use react (bad performance , we have to rerender the entire grid every time.) what we have done is that we get node like document.getElementByid where we say for every node for every 10 ms just change its classname directly in the grid. after when we are done with this.

now we'll animate the shortest path this time.we have apply the same logic except here we'll update the class node-shortest-path 

http://localhost:3000/