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