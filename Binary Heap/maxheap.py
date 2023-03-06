class MaxHeap:
    def __init__(self) -> None:
        self.heap = []
    def parent(self, i):
        return (i-1)//2
    
    def left_child(self, i):
        return 2*i + 1
    
    def right_child(self, i):
        return 2*i +2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j]
        
        