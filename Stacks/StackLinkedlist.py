class Node:
    def __init__(self, value) -> None:
        self.value = value
        self.next = None
        
        
class LinkedList:
    def __init__(self) -> None:
        self.head = None
        self.tail = None
        self.size = 0
        
class Stack:
    def __init__(self) -> None:
        self.LinkedList = LinkedList()
        
        #make the function iterable
    def __iter__(self):
        curNode = self.head
        while curNode:
            curNode = curNode.next
        
    def isEmpty(self):
        if self.LinkedList.head == None:
            return True
        else:
            return False
        
    def push(self, value):
        node.next = self.Linked.head
        self.LinkedList.head = node

        
customStack = Stack()
print(customStack.isEmpty())

        