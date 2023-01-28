# 4. Median of Two Sorted Arrays

# One approach to solving this problem is to use a binary search algorithm to find the median. The basic idea is to divide both arrays into two parts such that the left part have the same number of elements and the right parts have the same number of elements. Then if the maximum element of the left part of the first array is less than or equal to the minimum element of the right part of the secod array, and the maximum element of the left part of the second array is less than or equal to the minimum element of the right part of the first array, we have found the median.

# Otherwise, we can use the binary search algorithm to continue dividing the arrays and searching for the median.

# To achieve a time complexity of O(log(m+n)), we can use a modified version of binary search called "binary search with variable length", which allows us to search in arrays of different sizes in logarithmic time.

# Overall the algorithm is called as Median of Two Sorted Array, which can be solved using the variant of binary search called Binary Search with variable length.

#the code defines a class solution that contains a method findMedianSortedArrays which takes in two parameters, 'num1' and 'num2' which are the two sorted arrays for which we are trying to find median
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        
        half = total // 2
        
        if len(B) < len(A):
            #swap the values 
            A, B = B, A
        #run the binary values 
        l, r = 0, len(A)  - 1
        while True:
            i = (l + r) // 2    #A
            j = half - i - 2   #B
            
            
            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i +1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[J + 1] if (j + 1) <len(B) else float("infinity")
            
            if Aleft <= Bright and Bleft <= Aright:
                #odd
                if total % 2:
                    return min(Aright, Bright)
                
                #even 
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i -1
            else:
                l = i +1 
                     
        



