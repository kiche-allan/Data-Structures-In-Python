# Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

# Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

# Return k after placing the final result in the first k slots of nums.

# Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.


#SOLUTION ONE

# from ast import List


# class Solution:
#     def removeDuplicates(self, nums: List[int]) -> int:
#         l = 1
        
#         for r in range(1, len(nums)):
#             if nums[r] != nums[r-1]:
#                 nums[l] = nums[r]
                
#                 l + 1
#             return l

#SOLUTION TWO
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        
        # Check if the input array is empty, return 0 if it is
        
        if not nums:
            return 0
        
        #initialize the two pointers, l and where l points to the last unique element and r iterates through the array
        
        l = 0
        
        for r in range(1, len(nums)):
            
            #if the current element is different from the previous element, increment l pointer and replace the element at l pointer with current elemnt
            if nums[r] != nums[l]:
                l += 1
                nums[l] = nums[r]
                
                # Return the length of the array containing unique elements
                #Return the length of the array containing unique elements
        # The length of the array is slow + 1, as the slow pointer points to the last unique element, which is at index slow
        
        return l + 1
    
    #Describe your first thoughts on how to solve this problem
    # My first thought for solving this problem was using two pointers. One pointer will iterate through the array and the other pointer will keep track of the last unique element. If the current element is different from the previous element, the unique element pointer will be incremented and the current element will be placed in new position