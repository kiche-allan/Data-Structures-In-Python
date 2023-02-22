# To search for a node in a binary tree, you can use a depth-first search algorithm, such as a recursive approach. Here's how you can implement it in Python:

class TreeNode:
    def __init__(self, val = 0, left = None, right = None):
        self.val = val
        self.left = left
        self.right = right
        
def searchBST(root: TreeNode, val: int) -> TreeNode:
    if not root or root.val == val:
        return root
    
    if val < root.val:
        return searchBST(root.left, val)
    else:
        return searchBST(root.right, val)