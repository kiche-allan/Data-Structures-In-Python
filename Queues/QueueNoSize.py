class Queue:
    def __init__(self):
        self.queue = []
        
    def __str__(self) -> str:
        values = [str(x) for x in self.queue]
        return ' '.join(values)
    
    # create empty method
    def isEmpty(self):
        if self.items == []:
            return True
        else:
            return False
        
    #create an enqueue method
    
    def enqueue(self, value):
        self.items.append(value)
        return "The element has been successfully inserted"
    
customerQueue = Queue()
print(customerQueue.isEmpty())
    
    