Big O is a way to measure to measure the complexity of the algorithm. It describes the worst case scenario, in terms of number of baic operations such as additions, multiplications, comparisons e.tc. that an algorithm needs to perform in ordr to solve a problem of a certain size.
For example, an algorithm with time complexity of 0(n) needs to perform a certain number of operations proportional to the size of the input (n). An algorithm of a time complexity of 0(1) needs a constant number of operations regardless of the size of the input. 

0(1) - constant time complexity
def constant_algorithm(arr):
     return arr[0]
     This algorithm simply returns the first element of the array, and the number of operations it performs does not depend on the size of the array