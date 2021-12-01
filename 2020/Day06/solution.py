from collections import Counter

data = open('./input.txt').read().split('\n\n')

# Part 1
part1 = 0
for group in data:
    ans = group.replace('\n', '')
    unique_answers = set(list(ans))
    part1 += len(unique_answers)

print(f'Part 1: {part1}')

# Part 2
part2 = 0
for group in data:
    group_size = len(group.split('\n'))
    ans = group.replace('\n', '')
    counts = Counter(ans)
    for answer in counts:
        if counts[answer] == group_size:
            part2 += 1

print(f'Part 2: {part2}')
