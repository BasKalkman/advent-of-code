from functools import reduce

data = open('./input.txt').read().splitlines()


def check_slope(xInc, yInc):
    x = 0
    y = 0
    trees_seen = 0

    while y < len(data):
        if data[y][x % len(data[y])] == '#':
            trees_seen += 1

        x += xInc
        y += yInc

    return trees_seen


print(f'Part 1: {check_slope(3,1)}')
slopes_to_check = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
print(
    f'Part 2: {reduce((lambda x, y: x*y), [check_slope(a, b) for a, b in slopes_to_check])}')
