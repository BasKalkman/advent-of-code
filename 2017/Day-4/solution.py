from collections import Counter

data = [x for x in open('./input.txt').read().splitlines()]

valid_count = 0
valid_no_anagram = 0
for password in data:
    a = password.split(' ')
    b = set(password.split(' '))
    if len(a) == len(b):
        valid_count += 1

        # check for anagrams
        sorted_words = [''.join(sorted(x)) for x in password.split(' ')]
        if len(sorted_words) == len(set(sorted_words)):
            valid_no_anagram += 1

print('Part 1: ', valid_count)
print('Part 2: ', valid_no_anagram)
