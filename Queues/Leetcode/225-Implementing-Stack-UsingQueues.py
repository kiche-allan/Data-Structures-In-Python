# In implementing a stack with quesues, we can only implement 0(n) when pushing but 0(1) when popping time complexities. This is because we have to pop all the elements from the queue and push them back to the queue except the last element. This is done by using a temporary queue to store the elements. We can also implement 0(1) when popping but 0(n) when pushing time complexities. This is because we have to pop all the elements from the queue and push them back to the queue except the last element. This is done by using a temporary queue to store the elements.

class MyStack:
    def __init__(self):
        self.q = deque()
        
    def push(self, x: int) -> None:
        self.q.append(x)
        
    def pop(self) -> int:
        for i in range(len(self.q) -1):
            self.push(self.q.popleft())
            
        return self.q.popleft()
        
        
    def top(self) -> int:
        return self.q[-1]
        
    
    def empty(self) -> bool:
        return len(self.q) == 0
   
            