data = [list(map(lambda y: int(y), x.split('\t')))
        for x in open('./input.txt').read().splitlines()]

diffs = list(map(lambda x: (max(x) - min(x)), data))
print('Part 1: ', sum(diffs))

# Part 2
divisibles = []
for arr in data:
    for i in range(len(arr)-1):
        for j in range(i+1, len(arr)):
            a = float(arr[i] / arr[j])
            b = float(arr[j] / arr[i])
            if a.is_integer():
                divisibles.append(int(a))
                break
            if b.is_integer():
                divisibles.append(int(b))
                break


print('Part 2: ', sum(divisibles))
