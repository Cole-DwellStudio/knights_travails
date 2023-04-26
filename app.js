const boardSize = 8;

function buildGameBoard(boardSize) {
  const gameBoard = [];
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      gameBoard.push([i, j]);
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

let start = new Node([1, 1]);
let end = new Node([6, 5]);

shortestPath(start, end);
