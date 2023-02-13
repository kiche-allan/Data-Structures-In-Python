class Queue:
    def __init__(self) -> None:
        self.queue = []
        
        
    #add an element
    def enqueue(self, item):
        self.queue.append(item)
        
    #remove an element
    def dequeue(self):
        if len(self.queue) < 1:
            return None