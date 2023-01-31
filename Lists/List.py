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
