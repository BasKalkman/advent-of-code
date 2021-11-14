data = [int(x) for x in open('./input.txt').read()]
data.append(data[0])

part1 = 0
for i in range(len(data) - 1):
    if data[i] == data[i+1]:
        part1 += data[i]

print(part1)

# part2
data.pop(-1)
steps_to_jump = len(data) / 2

part2 = 0
for i in range(len(data)):
    halfway_index = int((i + steps_to_jump) % len(data))
    if data[i] == data[halfway_index]:
        part2 += data[i]
print(part2)
