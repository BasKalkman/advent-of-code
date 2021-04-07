const fs = require('fs');

const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\r\n\r\n')
    .map((e) => {
        return e.replace(/\r\n/g, ' ');
    })
    .map((line) => generatePassportObject(line));

function generatePassportObject(string) {
    let obj = {};

    string.split(' ').map((e) => {
        let [key, value] = e.split(':');
        obj[key] = value;
    });

    return obj;
}

const part1 = data.filter((passport) => {
    let keys = Object.keys(passport);

    let isValid = true;

    keys.includes('byr') ? '' : (isValid = false);
    keys.includes('iyr') ? '' : (isValid = false);
    keys.includes('eyr') ? '' : (isValid = false);
    keys.includes('hgt') ? '' : (isValid = false);
    keys.includes('hcl') ? '' : (isValid = false);
    keys.includes('ecl') ? '' : (isValid = false);
    keys.includes('pid') ? '' : (isValid = false);

    if (isValid) {
        return passport;
    }
});

console.log('Part 1: ', part1.length);

const part2 = part1
    .filter((passport) => {
        let { eyr, iyr, byr } = passport;

        eyr = parseInt(eyr);
        iyr = parseInt(iyr);
        byr = parseInt(byr);

        let valid = true;

        if (eyr === NaN || eyr < 2020 || eyr > 2030) {
            valid = false;
        }
        if (iyr === NaN || iyr < 2010 || iyr > 2020) {
            valid = false;
        }
        if (byr === NaN || byr < 1920 || byr > 2002) {
            valid = false;
        }

        if (valid) {
            return passport;
        }
    })
    .filter((passport) => {
        let hgt = parseInt(passport.hgt.match(/\d+/));

        if (passport.hgt.match(/cm/)) {
            if (hgt < 150 || hgt > 193) {
                return false;
            }
        } else if (passport.hgt.match(/in/)) {
            if (hgt < 59 || hgt > 76) {
                return false;
            }
        } else {
            return false;
        }

        return passport;
    })
    .filter((passport) => {
        if (passport.hcl.match(/#[a-f0-9]{6}/)) {
            return passport;
        } else {
            return false;
        }
    })
    .filter((passport) => {
        const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        if (eyeColors.includes(passport.ecl)) {
            return passport;
        } else {
            return false;
        }
    })
    .filter((passport) => {
        if (passport.pid.length === 9 && passport.pid.match(/\d{9}/)) {
            return passport;
        } else {
            return false;
        }
    });

console.log('Part 2: ', part2.length);
