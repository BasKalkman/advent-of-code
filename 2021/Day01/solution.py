data = [int(x) for x in open('./input.txt').read().splitlines()]


def check_for_increases(list):
    counter = 0
    for idx in range(len(list) - 1):
        if list[idx] < list[idx+1]:
            counter += 1

    return counter


part1 = check_for_increases(data)
print(f'Part 1: {part1}')

# Part 2
p2 = []
for i in range(len(data) - 2):
    p2.append(sum(data[i:i+3]))

part2 = check_for_increases(p2)
print(f'Part 2: {part2}')
