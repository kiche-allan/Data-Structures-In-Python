#the fibonacci numbers are a sequence of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1. The sequence goes like: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

#the fibonnacci numbers can be defined using recusrsion as follows:
# - the first fibonnacci number is 0
# - the second fibonnacci number is 1
# - each subsequent fibonacci number is the sum of the previous two fibonacci numbers

def fibonacci(n):
    #base case: the first two fibonacci numbers are 0 and 1
    if n==0 :
        return n
    elif n ==1:
        return 1
    #recuraive case: the nth fibonacci number is the sum of the (n-1)th and (n-2)th fibonacci numbers
    
    else:
        return fibonacci(n-1) + fibonacci(n-2)
    
    #test the function
    
for i in range(10):
    print(fibonacci(i), end = " ")