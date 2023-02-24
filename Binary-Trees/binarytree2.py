class BinaryTree:
    def __init__(self, size):
        self.customList = size * [None]
        self.lastUsedIndex = 0
        self.maxSize = size
        
newBT = BinaryTree(8)


def getDeepestNode(rootNode):
    if not rootNode:
        return
    else:
        customQueue = queue.Queue()
        customQueue.enqueue(rootNode)
        while not(customQueue.isEmpty()):
            rootNode = customQueue.dequeue()
            if rootNode.leftChild:
                customQueue.enqueue(rootNode.leftChild)
            if rootNode.rightChild:
                customQueue.enqueue(rootNode.rightChild)