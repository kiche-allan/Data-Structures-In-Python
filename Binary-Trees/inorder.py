# Inorder traversal is another type of tree traversal algorithm used to visit all the nodes in a tree or a binary tree. It is called "inorder" because it visits the nodes in the following order:

# Traverse the left subtree in inorder.
# Visit the root node.
# Traverse the right subtree in inorder.
# In other words, the inorder traversal visits the current node after visiting its left child but before visiting its right child. Here's an example of the inorder traversal of a binary tree:

# Inorder traversal is useful in certain types of binary tree problems, such as finding the k-th smallest element in a binary search tree or checking if a binary tree is a valid binary search tree.

# Implementation
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
def inorderTraversal(root: TreeNode)-> List[int]:
    if not root:
        return []
    
    result = []
    stack = []
    
    while stack or root:
        while root:
            stack.append(root)
            root = root.left
            
        root = stack.pop()
