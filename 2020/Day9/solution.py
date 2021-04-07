data = [int(x) for x in open('./input.txt')]

# Part 1


def part1():
    invalid_number = False
    idx = 0

    while not invalid_number and idx < len(data):
        check_list = data[idx:idx+26]
        check_number = check_list[-1]
        found_sum = False

        for i in range(len(check_list)-1):
            diff = check_number - check_list[i]
            if diff in check_list:
                found_sum = True
                break

        if not found_sum:
            return check_number

        idx += 1


print(f'Part 1: {part1()}')


# Part 2
def part2():
    invalid_number = part1()
    sum = i = j = 0

    while sum != invalid_number:
        while sum < invalid_number:
            sum += data[i]
            i += 1
        while sum > invalid_number:
            sum -= data[j]
            j += 1

    sum_array = data[j:i]

    lowest = min(sum_array)
    highest = max(sum_array)

    return lowest + highest


print(f'Part 2: {part2()}')
