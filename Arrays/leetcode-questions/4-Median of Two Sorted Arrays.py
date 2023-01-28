# 4. Median of Two Sorted Arrays

# One approach to solving this problem is to use a binary search algorithm to find the median. The basic idea is to divide both arrays into two parts such that the left part have the same number of elements and the right parts have the same number of elements. Then if the maximum element of the left part of the first array is less than or equal to the minimum element of the right part of the secod array, and the maximum element of the left part of the second array is less than or equal to the minimum element of the right part of the first array, we have found the median.

# Otherwise, we can use the binary search algorithm to continue dividing the arrays and searching for the median.

# To achieve a time complexity of O(log(m+n)), we can use a modified version of binary search called "binary search with variable length", which allows us to search in arrays of different sizes in logarithmic time.

# Overall the algorithm is called as Median of Two Sorted Array, which can be solved using the variant of binary search called Binary Search with variable length.


#the code defines a class solution that contains a method findMedianSortedArrays which takes in two parameters, 'num1' and 'num2' which are the two sorted arrays for which we are trying to find median
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        #The method first creates two variables A and B and assigns them the values of nums1 and nums2 respectively.
        A, B = nums1, nums2
        
        #The variable total is defined as the sum of the lengths of the two input arrays, nums1 and nums2
        total = len(nums1) + len(nums2)
        
        #The variable half is defined as the floor division of total by 2
        half = total // 2
        
        
        #The code then checks if the length of array B is less than that of array A. If it is, the values of A and B are swapped.
        if len(B) < len(A):
            #swap the values 
            A, B = B, A
        #run the binary values 
        #Two variables l and r are defined and are assigned the values of 0 and (length of A - 1) respectively.
        l, r = 0, len(A)  - 1
        
        #The code then enters into an infinite loop, which will only be broken out of when the median of the two arrays is found.
        while True:
            #Within the loop, there are two variables i and j defined. i is assigned the floor division of the sum of l and r by 2. j is assigned the value of half - i - 2.
            i = (l + r) // 2    #A
            j = half - i - 2   #B
            
            
            #The code then defines four variables: Aleft, Aright, Bleft, and Bright. Aleft is assigned the value of the element at index i in array A, if i is greater than or equal to 0. Otherwise, it is assigned the value of negative infinity. Aright is assigned the value of the element at index (i + 1) in array A, if (i + 1) is less than the length of A. Otherwise, it is assigned the value of positive infinity. Bleft is assigned the value of the element at index j in array B, if j is greater than or equal to 0. Otherwise, it is assigned the value of negative infinity. Bright is assigned the value of the element at index (j + 1) in array B, if (j + 1) is less than the length of B. Otherwise, it is assigned the value of positive infinity.

#The code then checks if Aleft is less than or equal to Bright and Bleft is less than or equal to Aright. If both conditions are true, the median has been found. If total is odd, the median is returned as the minimum of Aright and Bright. If total is even, the median is returned as the average of the maximum of Aleft and Bleft and the minimum of Aright and Bright.

#If the above conditions are not true, the code checks if Aleft is greater than Bright. If it is, the value of r is updated to be i - 1. If not, the value of l is updated to be i + 1.

#The loop continues until the median is found and returned.





            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i +1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) <len(B) else float("infinity")
            
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
                     
        



