class Node:
    def __init__(self) -> None:
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self) -> None:
        self.head = None
        self.tail = None
        self.size = 0
        
singly_linked_list = LinkedList()
node1 = Node(1)
node2 = Node(2)

#connect the nodes
singly_linked_list.head = node1
singly_linked_list.head.next = node2
singly_linked_list.tail = node2

#delete a node from singly linked list
def deleteNode(self, location):
    if self.head is None:
        print('The SSL does not exist')
        
    else:
        if location == 0:
            if self.head == self.tail:
                self.head = None
                self.tail = None
            else:
                self.head = self.head.next