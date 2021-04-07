import re


def parse_ticket(ticket):
    ticket = re.sub(r'[FL]', '0', ticket)
    ticket = re.sub(r'[BR]', '1', ticket)

    row = ticket[:7]
    seat = ticket[7:]

    return int(row, 2) * 8 + int(seat, 2)


data = [parse_ticket(x) for x in open('./input.txt').read().splitlines()]

print(f'Part 1: {max(data)}')

for seat_id in data:
    if not seat_id + 1 in data and seat_id + 2 in data:
        print(f'Part 2: {seat_id + 1}')
        break
