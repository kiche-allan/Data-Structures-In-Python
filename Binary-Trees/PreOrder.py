# Preorder traversal is a type of tree traversal algorithm used to visit all the nodes in a tree or a binary tree. It is called "preorder" because it visits the nodes in the following order:

# Visit the root node.
# Traverse the left subtree in preorder.
# Traverse the right subtree in preorder.
# In other words, the preorder traversal visits the current node before visiting its children. Here's an example of the preorder traversal of a binary tree:

# Preorder traversal is useful in certain types of binary tree problems, such as building an expression tree or converting a tree to a linked list.

class TreeNode:
    def __init__(self, val =0, left = None, right = None):
        self.val = val
        self.left = left
        self.right = right
        
def preorderTraversal(root: TreeNode):
    if not root:
        return []
        # print(root.val)
        # preorderTraversal(root.left)
        # preorderTraversal(root.right)
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
            
    return result
        