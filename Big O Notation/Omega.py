# Omega notation describes the best-case scenario in terms of the number of basic operations that an algorithm needs to perform in order to solve a problem of a certain size. aIts the opposite of big o notation

def linear_search(arr, x):
    for i in range(len(arr)):
        if arr[i] ==x:
            return i
        return -1
    print(linear_search)
    
#The best-case scenario for this linear search algorithm is when the element is found at the first index (Ω(1)) and the worst-case scenario is when the element is not found in the array and the algorithm has to iterate through all the elements (O(n)). The average-case scenario is when the element is found after iterating through half of the elements (Θ(n/2))