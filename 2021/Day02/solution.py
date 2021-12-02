data = [[a, int(b)] for a,b in (line.split(' ') for line in open('./input.txt').readlines())]

def run_instruction(p2=False):
    h = d = a = 0

    for x in data:
        direction, num = x
        if not p2:
            if direction == 'forward':
                h += num
            if direction == 'down':
                d += num
            if direction == 'up':
                d -= num
        else:
            if direction == 'forward':
                h += num
                d += a * num
            if direction == 'down':
                a += num
            if direction == 'up':
                a -= num
        
    return h * d

print(run_instruction())
print(run_instruction(True))