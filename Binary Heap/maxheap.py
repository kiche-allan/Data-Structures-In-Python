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
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
        
    def insert(self, item):
        self.heap.append(item)
        i = len(self.heap) - 1
        while i > 0 and self.head[i] > self.heap[self.parent(i)]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
            
    def max_heapify(self, i):
        l = self.left_child(i)
        r = self.right_child(i)
        
        largest = i
        if l< len(self.heap) and self.heap[l]> self.heap[i]:
            largest = l
        if r < len(self, heap) and self.heap[r] > self.heap[largest]:
            largest = r
            
        if largest != i:
            self.swap(i, largest)
            self.max_heapify(largest)
    def extract_max(self):
        if len(self.heap) == 0:
            return None
            
        
        