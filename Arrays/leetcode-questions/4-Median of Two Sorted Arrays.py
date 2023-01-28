# 4. Median of Two Sorted Arrays

# One approach to solving this problem is to use a binary search algorithm to find the median. The basic idea is to divide both arrays into two parts such that the left part have the same number of elements and the right parts have the same number of elements. Then if the maximum element of the left part of the first array is less than or equal to the minimum element of the right part of the secod array, and the maximum element of the left part of the second array is less than or equal to the minimum element of the right part of the first array, we have found the median.

# Otherwise, we can use the binary search algorithm to continue dividing the arrays and searching for the median.

# To achieve a time complexity of O(log(m+n)), we can use a modified version of binary search called "binary search with variable length", which allows us to search in arrays of different sizes in logarithmic time.

# Overall the algorithm is called as Median of Two Sorted Array, which can be solved using the variant of binary search called Binary Search with variable length.

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        
        half = total //2
        
        if len(B) < len(A):
            A, B = B, A
        



