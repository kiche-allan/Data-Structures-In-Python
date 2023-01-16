#a common usecase  for recusriion is traversing and manipulating tree-like data structures. Here is an example of a recursive function that traverses a tree and prints the value of each node in the tree.

class Node:
    def __init__(self, value, left = None, right= None):
        #the above line defines a class 'node' and a method '__init__' that takes three arguments of vaue, left and right. the left and right arguments are optional and default to None. 'value' is the value of the node, 'left' is a reference of the left child node and 'right' is a reference to the right child node. 
        
        #self is not an explicit argument in the above code because it is automatically passed by Python to a method when it is called on an instance of a class. 
        
        #in the above code, 'self' is passed to the '__init__' and 'print_tree' method as the first argument when it is called on an instance of the class 'Node'.
        #'self'is used to refer to the current isntance of the class This allows the method to set the value of the instance variables, 'self.value', 'self.left' and 'self.right' to the values passed to the '__init__' method.
        
        #  Similarly, in the print_tree method, self is used to refer to the current instance of the class and access its attributes such as value, left, and right.
        
        #In python, self is used as a way to refer to the instance of a class, this is why it's not necessary to pass it as an explicit argument. It is automatically passed by Python when a method is called on an instance of a class.