import re
from collections import Counter

totalP1 = 0
totalP2 = 0
with open('./input.txt') as data:
    for line in data.read().splitlines():
        nums, rule, password = line.split(' ')
        lo, hi = [int(x) for x in nums.split('-')]
        rule = rule.replace(':', '')

        # Part 1
        counts = Counter(password)
        if lo <= counts[rule] <= hi:
            totalP1 += 1

        # Part 2
        if rule in [line[lo], line[hi]]:
            if line[lo] != line[hi]:
                totalP2 += 1

print(f'Part 1: {totalP1}')
print(f'Part 2: {totalP2}')
