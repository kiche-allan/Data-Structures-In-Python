# Postorder traversal is a tree traversal algorithm used to visit all the nodes in a tree or a binary tree. It is called "postorder" because it visits the nodes in the following order:

# Traverse the left subtree in postorder.
# Traverse the right subtree in postorder.
# Visit the root node.
# In other words, the postorder traversal visits the current node after visiting both its left and right children. Here's an example of the postorder traversal of a binary tree:

# The postorder traversal of this tree would be: 4, 5, 2, 6, 3, 1. It starts by visiting the leftmost leaf node (4), then its sibling (5), then their parent (2), then the right child (6), then their parent (3), and finally the root node (1).

# Postorder traversal is useful in certain types of binary tree problems, such as calculating the height of a binary tree or evaluating the expression represented by a binary expression tree.

class TreeNode:
    def __init__(self, val = 0,left = None, right = None):
        self.val = val
        self.left = left
        self.right = right
        
        
def postorderTraversal(root: TreeNode) -> List(int):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
            
    return result[::-1]