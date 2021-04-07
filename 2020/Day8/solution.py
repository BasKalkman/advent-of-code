instructions = open('./input.txt').read().splitlines()


# Part 1
def part1():
    accumulator = 0
    idx = 0
    seen = {}

    while idx not in seen:
        seen[idx] = 1
        op, num = instructions[idx].split(' ')

        if op == 'acc':
            accumulator += int(num)
            idx += 1
        elif op == 'jmp':
            idx += int(num)
        elif op == 'nop':
            idx += 1

    return accumulator


print(f'Part 1: {part1()}')

# Part 2


def part2():
    checked_indices = []
    success = False

    while not success:
        accumulator = 0
        idx = 0
        seen = {}
        changed_this_round = False

        while idx not in seen and idx < len(instructions):
            seen[idx] = 1
            op, num = instructions[idx].split(' ')

            if idx not in checked_indices and not changed_this_round:
                checked_indices.append(idx)
                changed_this_round = True
                if op == 'jmp':
                    op = 'nop'
                elif op == 'nop':
                    op = 'jmp'

            if op == 'acc':
                accumulator += int(num)
                idx += 1
            elif op == 'jmp':
                idx += int(num)
            elif op == 'nop':
                idx += 1

        if idx >= len(instructions):
            success = True
            return accumulator
        else:
            changed_this_round = False


print(f'Part 2: {part2()}')
