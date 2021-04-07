data = [int(x) for x in open('./input.txt')]

# Part 1
for num in data:
    r = 2020 - num
    if r in data:
        print(num * r)
        break

# Part 2
for i in range(len(data)):
    for j in range(i+1, len(data)):
        remainder = 2020 - data[i] - data[j]
        if remainder in data:
            print(data[i] * data[j] * remainder)
            break
