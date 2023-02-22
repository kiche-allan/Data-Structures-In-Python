# Level order traversal, also known as breadth-first traversal, is a tree traversal algorithm used to visit all the nodes in a tree or a binary tree, starting from the root node and visiting each level of the tree before moving on to the next level. It visits the nodes in the following order:

# Visit the root node.
# Visit all the nodes at level 1 (the children of the root node).
# Visit all the nodes at level 2 (the grandchildren of the root node).
# Visit all the nodes at level 3 (the great-grandchildren of the root node).
# And so on, until all the nodes in the tree have been visited.
# In other words, the level order traversal visits the nodes in order of increasing depth, from top to bottom and from left to right.

# Level order traversal is useful in a variety of binary tree problems, such as finding the minimum depth of a binary tree or finding the leftmost or rightmost node in a binary tree.

class TreeNode:
    def __init__(self, val=0, left= None, right= None):
        self.val = val
        self.left = left
        self.right = right