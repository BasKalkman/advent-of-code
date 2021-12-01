import re

passports = [x.replace('\n', ' ')
             for x in open('./input.txt').read().split('\n\n')]

required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

valid_passport_count = 0
valid_passport_count_part2 = 0
for passport in passports:
    # Part 1
    fields = {}
    for field in re.findall('(.{3}):', passport):
        fields[field] = 1

    valid = True
    for req_field in required_fields:
        if req_field not in fields:
            valid = False
            break

    if valid:
        valid_passport_count += 1

        # Part 2
        for req_field in required_fields:
            text = re.search(
                rf'{req_field}:[\w\d#]+', passport).group().split(':')[1]

            if req_field == 'byr':
                if not 1920 <= int(text) <= 2002:
                    valid = False
                    break
            elif req_field == 'iyr':
                if not 2010 <= int(text) <= 2020:
                    valid = False
                    break
            elif req_field == 'eyr':
                if not 2020 <= int(text) <= 2030:
                    valid = False
                    break
            elif req_field == 'hgt':
                num = int(re.match(r'\d+', text).group())
                if re.search(r'cm', text):
                    if not 150 <= num <= 193:
                        valid = False
                        break
                elif num and re.search(r'in', text):
                    if not 59 <= num <= 76:
                        valid = False
                        break
                else:
                    valid = False
                    break
            elif req_field == 'hcl':
                if not re.search(r'#[0-9a-f]{6}', text):
                    valid = False
                    break
            elif req_field == 'ecl':
                if text not in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']:
                    valid = False
                    break
            elif req_field == 'pid':
                if not len(text) == 9 or not re.match(r'\d{9}', text):
                    valid = False
                    break

        if valid:
            valid_passport_count_part2 += 1


print(f'Part 1: {valid_passport_count}')
print(f'Part 2: {valid_passport_count_part2}')
