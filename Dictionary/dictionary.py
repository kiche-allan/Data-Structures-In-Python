#creating a dictionary
phone_book = {'John': 123456789, 'Jack': 987654321, 'Jill': 456789123}

#accessing the value for a key
print(phone_book['John'])

#adding a new key-value pair
phone_book['Jack'] = '555-333'

#updating a value for a key
phone_book['Jill'] = '555-2468'

#removing a key-value pair
del phone_book['John']

#checking if a key exists in the dictionary

if 'Jack' in phone_book:
    print("Jack's phone number is ", phone_book['Jack'])
    
#iterating over a dictionary

for name in phone_book:
    print(name, phone_book[name])