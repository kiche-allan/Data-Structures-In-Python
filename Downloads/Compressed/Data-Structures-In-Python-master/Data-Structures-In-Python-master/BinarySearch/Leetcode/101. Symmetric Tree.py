# Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

class Solution:
    def isSymmetric(self, root:Optional[TreeNode]) -> bool:
        def is_mirror(left, right):
            if not left and not right:
                return True
            if not left or not right:
                return False
            return left.val == right.val and is_mirror(left.left, right.right) and is_mirror(left.right, right.left)
        return is_mirror(root, root.mirror())