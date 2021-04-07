from collections import Counter
import difflib

data = open("./input.txt").read().splitlines()

# Part 1
twos = []
threes = []

for str in data:
    if 2 in Counter(str).values():
        twos.append(str)
    if 3 in Counter(str).values():
        threes.append(str)

print(len(twos) * len(threes))

# PART 2
for i in range(0, len(data)):
    first_string = data[i]
    for j in range(i + 1, len(data)):
        second_string = data[j]
        diff = 0
        for idx in range(len(first_string)):
            if first_string[idx] != second_string[idx]:
                diff += 1
        if diff == 1:
            print(first_string)
            print(second_string)
