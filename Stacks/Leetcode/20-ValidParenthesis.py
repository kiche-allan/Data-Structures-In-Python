#  Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

# An input string is valid if:

# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
# Every close bracket has a corresponding open bracket of the same type.
 

# Example 1:

# Input: s = "()"
# Output: true
# Example 2:

# Input: s = "()[]{}"
# Output: true
# Example 3:

# Input: s = "(]"
# Output: false
 

# Constraints:

# 1 <= s.length <= 104
# s consists of parentheses only '()[]{}'.

class Solution:
    def isValid(self, s:str) -> bool:
        stack = []
        closeToOpen = {")":"(", "}":"{", "]":"["}
        
        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop
                else:
                    return False
            else:
                stack.append(c)
        return True if not stack else False
    
#     This code defines a class named Solution with a method named isValid. The method takes a string s as input and returns a boolean indicating whether the string is a valid parenthesis sequence. The method uses a stack data structure to keep track of the opening parentheses as it iterates through the input string.

# Here's how the method works:

# Initialize an empty stack stack and a dictionary closeToOpen that maps closing parentheses to their corresponding opening parentheses.

# For each character c in the input string s, do the following:

# If c is a closing parenthesis and the stack is not empty, pop the last element from the stack and compare it with the corresponding opening parenthesis from the closeToOpen dictionary. If they match, continue with the next character. If they don't match, return False.

# If c is an opening parenthesis, push it onto the stack.

# After iterating through all the characters in the input string, return True if the stack is empty, otherwise return False.

# The purpose of this method is to determine whether the parentheses in the input string are balanced, i.e., every opening parenthesis has a corresponding closing parenthesis, and they are properly nested.
        
# Describe your first thoughts on how to solve this problem.
# To solve this problem, you can use a stack data structure to keep track of the opening parentheses as you iterate through the input string. Whenever you encounter an opening parenthesis, you can push it onto the stack. Whenever you encounter a closing parenthesis, you can pop the last opening parenthesis from the stack and check if it matches the current closing parenthesis. If the parentheses are properly balanced, at the end of the iteration, the stack should be empty. If there are any unmatched parentheses, the stack will not be empty and you can return False.

# Describe your approach to solving the problem

# One way to solve this problem is to use a stack data structure to keep track of the opening parentheses as you iterate through the input string. Whenever you encounter an opening parenthesis, you can push it onto the stack. Whenever you encounter a closing parenthesis, you can pop the last opening parenthesis from the stack and check if it matches the current closing parenthesis. If the parentheses are properly balanced, at the end of the iteration, the stack should be empty. If there are any unmatched parentheses, the stack will not be empty and you can return False.

# This approach is straightforward and easy to implement, making it a popular solution for this type of problem.