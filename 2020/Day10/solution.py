import time

data = sorted([int(x) for x in open('./input.txt').read().splitlines()])
data = [0] + data
data.append(data[-1] + 3)

ones = 0
threes = 0
for i in range(len(data)-1):
    if data[i+1] - data[i] == 3:
        threes += 1
    elif data[i+1] - data[i] == 1:
        ones += 1

print(f'Part 1: {ones * threes}')

# Part 2

checked = {}


def check_adapter(idx):
    if idx == len(data) - 1:
        return 1
    if idx in checked:
        return checked[idx]

    ans = 0
    for i in range(idx+1, len(data)):
        if data[i] - data[idx] <= 3:
            ans += check_adapter(i)
        else:
            break

    checked[idx] = ans
    return ans


print(f'Part 2: {check_adapter(0)}')
