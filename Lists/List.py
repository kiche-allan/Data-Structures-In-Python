shoppingList = ["milk", "pasta", "eggs", "spam", "bread", "rice"]

#accessing the elements in the list
print(shoppingList[0])
print(shoppingList[4])
print(shoppingList[-3])

#check if an elemt is in the list
print("banana" in shoppingList)


#traversing the elements in the list using a loop

for i in shoppingList:
    print(i)

    #traverse in reverse order
    for i in shoppingList[::-1]:
        print(i)
        
#traverse using the range and len function
for i in range(len(shoppingList)):
    shoppingList[i] = shoppingList[i] + "!"
    print(shoppingList[i])
    
#empty list
emptyList = []
for i in emptyList:
    print("This is not going to happen")

#uupdating an element in the list
myList = [1, 2, 3, 4, 5]
print(myList)
myList[2] = 33
myList[0] = 11
print(myList)

# time complexity of the list
# 0(1)

#space complexity of the list
# 0(1)

#inserting an element in the list
myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(myList)

#insering an element to the beginning of list

myList.insert(0, 33)
myList.insert(5, 78)
#it has an o(n) time complexity
print(myList)

#inserting an elemnt to any given place in the list
#inserting an element to the end of the list

myList.append(100)
#has an o(1) time complexity
#has an o(1) space complexity
print(myList)

#adding another list to the list
newList = [11, 22, 33, 44, 55]
myList.extend(newList)
#time complexity depends on the length of the list and size of the list

print(myList)
