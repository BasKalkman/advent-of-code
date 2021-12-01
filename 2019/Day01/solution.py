data = [int(x) for x in open('input.txt').read().splitlines()]

# Part 1
print(sum(x // 3 - 2 for x in data))

# Part 2
def calc_fuel(mass):
    fuel = mass // 3 - 2

    return fuel + calc_fuel(fuel) if fuel > 0 else 0

print(sum(calc_fuel(x) for x in data))
