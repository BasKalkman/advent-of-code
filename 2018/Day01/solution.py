freqs = [int(x) for x in open('./input.txt')]

print(f'Part 1: {sum(freqs)}')

seen = set()

current_freq = 0
i = 0

while current_freq not in seen:
    seen.add(current_freq)
    current_freq += freqs[i % len(freqs)]
    i += 1

print(f'Part 2: {current_freq}')
