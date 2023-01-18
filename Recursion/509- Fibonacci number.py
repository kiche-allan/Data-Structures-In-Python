# The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

# F(0) = 0, F(1) = 1
# F(n) = F(n - 1) + F(n - 2), for n > 1.
# Given n, calculate F(n)

def fib(n: int) -> int:
    if n == 0:
        return 0
    elif n == 1:
        return 1
    
    else:
        fib_list = [0, 1]
        for i in range(2, n +1):
            fib_list.append(fib_list[i-1] + fib_list[i-2])
        return fib_list(n)