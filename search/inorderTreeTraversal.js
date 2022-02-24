const functionalTest = require('../functionalTest')

const TYPE_RECURSE = 0;
const TYPE_ITERATE = 1;

/** Data structure to store a binary tree node */
class MyNode {
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
 * @param {MyNode} root The node at which to begin the search/traversal.
 * @param {number} type The type of loop to do (specified by TYPE_RECURSE | TYPE_ITERATE).
 */
function main(root, type) {
    arrVisitedNodesPath = [root.data];

    if (type === TYPE_RECURSE) {
        inorder_recursive(root);
        //console.log(`Visited nodes path (recursive): ${[...arrVisitedNodesPath]}`);
    }
    else if (type === TYPE_ITERATE) {
        inorder_iterative(root);
        //console.log(`Visited nodes path (iterative): ${[...arrVisitedNodesPath]}`);
    }

    return arrVisitedNodesPath;
}

/** Recursive function to go as deep down the left branch as possible, 
 * then work its way back up from the bottom until a node is reached
 * in which it can go back down again (even if it's right), but will
 * focus on working left-down whenever it's possible.
 * 
 * @param {MyNode} node The node (root if initiating, or child if recursing) to visit.
 */
function inorder_recursive(node) {
    // Return if the current node doesn't exist
    if (!node) return;

    // Traverse the left subtree
    let left = inorder_recursive(node.left);

    // Save the current node to the path tracker
    arrVisitedNodesPath.push(node.data);

    // Traverse the right subtree
    let right = inorder_recursive(node.right);
}

/** Iterative function to go as deep down the left branch as possible, 
 * then work its way back up from the bottom until a node is reached
 * in which it can go back down again (even if it's right), but will
 * focus on working left-down whenever it's possible.
 * 
 * @param {MyNode} root The root node.
 */
 function inorder_iterative(root) {
    // Create an empty stack (in JS, this is an array that pushes-to and pops-off)
    let stack = [];
    
    // Start from the root node (set current node to the root node)
    let currNode = root;

    // Iterate as long as we have a valid node, or the stack has stuff in it
    while (currNode != null || stack.length != 0) {
        // If the current node exists, push it onto the stack (defer it).
        // Then move on to its left child.
        if (currNode != null) {
            stack.push(currNode);
            currNode = currNode.left;
        }
        else {
            // Otherwise (current node is null), so pop an element from
            // the stack, and set the current node to its right child.
            currNode = stack.pop();
            
            // Save the current node to the path tracker
            arrVisitedNodesPath.push(currNode.data);

            currNode = currNode.right;
        }
    }
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
var root = new MyNode(1); root.gen = 0; root.label = "Root";
root.left = new MyNode(2); root.left.gen = 1; root.left.label = "Child";
root.right = new MyNode(3); root.right.gen = 1; root.right.label = "Child";
root.left.left = new MyNode(4); root.left.left.gen = 2; root.left.left.label = "Grandchild";
root.right.left = new MyNode(5); root.right.left.gen = 2; root.right.left.label = "Grandchild";
root.right.right = new MyNode(6); root.right.right.gen = 2; root.right.right.label = "Grandchild";
root.right.left.left = new MyNode(7); root.right.left.left.gen = 7; root.right.left.left.label = "Great Grandchild";
root.right.left.right = new MyNode(8); root.right.left.right.gen = 8; root.right.left.right.label = "Great Grandchild";
var expected = [1,4,2,1,7,5,8,3,6];
var output = main(root, TYPE_RECURSE);
functionalTest.check(expected, output);
var output = main(root, TYPE_ITERATE);
functionalTest.check(expected, output);

// Construct a default binary tree like:
//     1
//    / \
//   2   3
//  / \   \
// 4   5   6
//    / \
//   7   8
var root = new MyNode(1); root.gen = 0; root.label = "Root";
root.left = new MyNode(2); root.left.gen = 1; root.left.label = "Child";
root.right = new MyNode(3); root.right.gen = 1; root.right.label = "Child";
root.left.left = new MyNode(4); root.left.left.gen = 2; root.left.left.label = "Grandchild";
root.left.right = new MyNode(5); root.left.right.gen = 2; root.left.right.label = "Grandchild";
root.right.right = new MyNode(6); root.right.right.gen = 2; root.right.right.label = "Grandchild";
root.left.left.left = new MyNode(7); root.left.left.left.gen = 3; root.left.left.left.label = "Great Grandchild";
root.left.left.right = new MyNode(8); root.left.left.right.gen = 3; root.left.left.right.label = "Great Grandchild";
var expected = [1,7,4,8,2,5,1,3,6];
var output = main(root, TYPE_RECURSE);
functionalTest.check(expected, output);
var output = main(root, TYPE_ITERATE);
functionalTest.check(expected, output);
