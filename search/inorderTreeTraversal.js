/** Data structure to store a binary tree node */
class Node {
    constructor(key) {
        this.data = key;
        this.left = null;
        this.right = null;

        this.gen = 0;
        this.label;
    }
}

// Init a global array for tracking the traversed path
let arrVisitedNodesPath;

/** Initiating function and recursion initiator.
 * 
 * @param {Node} node The node at which to begin the search/traversal.
 */
function main(root) {
    arrVisitedNodesPath = [root];

    inorder_recursive(root);
    
    let path = "Visited nodes path:";
    for (let node of arrVisitedNodesPath) path = path.concat(` ${node.data}`);
    console.log(path);
}

/** Recursive function to go as deep down the left branch as possible, 
 * then work its way back up from the bottom until a node is reached
 * in which it can go back down again (even if it's right), but will
 * focus on working left-down whenever it's possible.
 * 
 * @param {Node} node The node (root if initiating, or child if recursing) to visit.
 */
function inorder_recursive(node) {
    // Return if the current node doesn't exist
    if (!node) return;

    // Traverse the left subtree
    let left = inorder_recursive(node.left);

    // Save the current node to the path tracker
    arrVisitedNodesPath.push(node);

    // Traverse the right subtree
    let right = inorder_recursive(node.right);
}

/********************************************************************/
// These are the tests we use to determine if the solution is correct.

// Construct a default binary tree like:
//     1
//    / \
//   2   3
//  /   / \
// 4   5   6
//    / \
//   7   8
var root = new Node(1); root.gen = 0; root.label = "Root";
root.left = new Node(2); root.left.gen = 1; root.left.label = "Child";
root.right = new Node(3); root.right.gen = 1; root.right.label = "Child";
root.left.left = new Node(4); root.left.left.gen = 2; root.left.left.label = "Grandchild";
root.right.left = new Node(5); root.right.left.gen = 2; root.right.left.label = "Grandchild";
root.right.right = new Node(6); root.right.right.gen = 2; root.right.right.label = "Grandchild";
root.right.left.left = new Node(7); root.right.left.left.gen = 7; root.right.left.left.label = "Great Grandchild";
root.right.left.right = new Node(8); root.right.left.right.gen = 8; root.right.left.right.label = "Great Grandchild";
main(root);

// Construct a default binary tree like:
//     1
//    / \
//   2   3
//  / \   \
// 4   5   6
//    / \
//   7   8
var root = new Node(1); root.gen = 0; root.label = "Root";
root.left = new Node(2); root.left.gen = 1; root.left.label = "Child";
root.right = new Node(3); root.right.gen = 1; root.right.label = "Child";
root.left.left = new Node(4); root.left.left.gen = 2; root.left.left.label = "Grandchild";
root.left.right = new Node(5); root.left.right.gen = 2; root.left.right.label = "Grandchild";
root.right.right = new Node(6); root.right.right.gen = 2; root.right.right.label = "Grandchild";
root.left.left.left = new Node(7); root.left.left.left.gen = 3; root.left.left.left.label = "Great Grandchild";
root.left.left.right = new Node(8); root.left.left.right.gen = 3; root.left.left.right.label = "Great Grandchild";
main(root);
