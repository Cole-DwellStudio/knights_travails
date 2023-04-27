const boardSize = 8;

function buildGameBoard(size = 8) {
  const gameBoard = [];
  for (let i = size; i >= 1; i--) {
    for (let j = 1; j <= size; j++) {
      gameBoard.push([j, i]);
    }
  }
  return gameBoard;
}

class Knight {
  constructor(startingPosition = [0, 0]) {
    this.currentPosition = startingPosition;
  }
}

function isValid(position) {
  if (position[0] < 1 || position[1] < 1) return false;
  if (position[0] > boardSize || position[1] > boardSize) return false;
  return true;
}

function getPositions(Position) {
  if (!isValid(Position.position)) return null;

  let x = Position.position[0];
  let y = Position.position[1];

  let validPositions = [];
  let possiblePositions = [];

  possiblePositions.push([x + 1, y + 2]);
  possiblePositions.push([x + 2, y + 1]);
  possiblePositions.push([x + 2, y - 1]);
  possiblePositions.push([x + 1, y - 2]);
  possiblePositions.push([x - 1, y + 2]);
  possiblePositions.push([x - 2, y + 1]);
  possiblePositions.push([x - 1, y - 2]);
  possiblePositions.push([x - 2, y - 1]);

  possiblePositions.forEach((position) => {
    if (isValid(position)) {
      validPositions.push(new Node(position, Position));
    }
  });

  return validPositions;
}

class Node {
  constructor(position = [0, 0], parent = null) {
    this.position = position;
    this.parent = parent;
  }
  children = [];
}

function buildTree(start = new Node([1, 1]), end = new Node([8, 8])) {
  // return path to found node using depth first search
  let foundNode = null;
  let queue = [];
  let current = start;
  queue.push(start);
  while (foundNode == null) {
    current = queue[0];
    if (
      current.position[0] == end.position[0] &&
      current.position[1] == end.position[1]
    ) {
      foundNode = current;
      return foundNode;
    }
    current.children.push(...getPositions(current));
    queue.push(...current.children);
    queue.splice(0, 1);
  }
  return null;
}

function shortestPath(start = new Node([1, 1]), end = new Node([8, 8])) {
  let foundNode = buildTree(start, end);
  let path = [];
  while (foundNode.parent != null) {
    path.unshift(foundNode.position);
    foundNode = foundNode.parent;
  }
  console.log(`You made it in ${path.length} moves! Here's your path:`);
  console.log(start.position);
  path.forEach((node) => console.log(node));
  return path;
}

function printTree(root) {
  if (root.children.length <= 0) return;
  console.log(`*[${root.position}]*`);
  let values = "";
  root.children.forEach((child) => {
    values += `[${child.position[0]},${child.position[1]}]`;
  });
  console.log(`**${values}**`);
  root.children.forEach((child) => printTree(child));
}

function drawBoard(gameBoard) {
  const boardContainer = document.getElementById("board");
  gameBoard.forEach((tile) => {
    let tileElement = document.createElement("div");
    // let tileButtonElement = document.createElement("button");
    // tileButtonElement.addEventListener("click", drawShortestPath);
    // tileElement.appendChild(tileButtonElement);
    tileElement.addEventListener("click", drawShortestPath);
    tileElement.classList.add("tile");
    tileElement.dataset.x = tile[0];
    tileElement.dataset.y = tile[1];
    // tileElement.innerText = `${tileElement.dataset.x},${tileElement.dataset.y}`;
    boardContainer.appendChild(tileElement);
  });
}

let currentStart = null;
let currentEnd = null;

function drawShortestPath(e) {
  if (currentStart == null) {
    currentStart = new Node([
      parseInt(e.srcElement.dataset.x),
      parseInt(e.srcElement.dataset.y),
    ]);
    e.srcElement.style.backgroundImage = "url('./Knight.svg')";
    e.srcElement.style.backgroundSize = "contain";
    e.srcElement.style.backgroundRepeat = "no-repeat";
    e.srcElement.style.backgroundPosition = "center";
    document.getElementById("result").innerText = "Click end tile.";
  } else if (currentEnd == null) {
    currentEnd = new Node([
      parseInt(e.srcElement.dataset.x),
      parseInt(e.srcElement.dataset.y),
    ]);
    path = shortestPath(currentStart, currentEnd);
    boardElements = Array.from(document.getElementById("board").children);

    let i = 1;
    path.forEach((node) => {
      boardElements.forEach((child) => {
        if (child.dataset.x == node[0] && child.dataset.y == node[1]) {
          number = document.createElement("div");
          number.innerText = i;
          child.appendChild(number);
          child.style.background = "#59A0E2";
          ++i;
        }
      });
    });
    document.getElementById(
      "result"
    ).innerText = `You made it in ${path.length} moves! Here's your path:`;
  }
}

let start = new Node([1, 1]);
let end = new Node([6, 5]);

drawBoard(buildGameBoard(8));
