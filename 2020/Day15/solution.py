input = [16, 1, 0, 18, 12, 14, 19]
# target_turn = 2020 #Part 1
target_turn = 30000000  # Part 2

current_value = input[-1]
current_turn = len(input)
seen = {}

for turn, num in enumerate(input):
    seen[num] = turn+1

while current_turn < target_turn:
    if current_value not in seen:
        seen[current_value] = current_turn
        current_value = 0
    else:
        last_turn = seen[current_value]
        seen[current_value] = current_turn
        current_value = current_turn - last_turn
    current_turn += 1

print(current_value)
