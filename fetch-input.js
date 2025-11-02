#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Fetches Advent of Code puzzle input for a given year and day
 * Usage: node fetch-input.js <year> <day>
 * Example: node fetch-input.js 2024 1
 * 
 * Requirements:
 * - Create a .env file in the root directory with your session cookie:
 *   AOC_SESSION=your_session_cookie_here
 * 
 * To get your session cookie:
 * 1. Log into adventofcode.com with GitHub
 * 2. Open browser DevTools (F12)
 * 3. Go to Application/Storage > Cookies > https://adventofcode.com
 * 4. Copy the value of the 'session' cookie
 */

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node fetch-input.js <year> <day>');
    console.error('Example: node fetch-input.js 2024 1');
    process.exit(1);
}

const year = parseInt(args[0]);
const day = parseInt(args[1]);

// Validate inputs
if (isNaN(year) || year < 2015 || year > new Date().getFullYear()) {
    console.error(`Invalid year: ${args[0]}`);
    process.exit(1);
}

if (isNaN(day) || day < 1 || day > 25) {
    console.error(`Invalid day: ${args[1]} (must be between 1 and 25)`);
    process.exit(1);
}

// Format day with leading zero
const dayFormatted = day.toString().padStart(2, '0');
const folderName = `Day${dayFormatted}`;
const folderPath = path.join(__dirname, year.toString(), folderName);
const inputFilePath = path.join(folderPath, 'input.txt');

// Check if input.txt already exists
if (fs.existsSync(inputFilePath)) {
    console.log(`Input already exists at: ${inputFilePath}`);
    console.log('Nothing to do.');
    process.exit(0);
}

// Load session cookie from .env file
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found!');
    console.error('Please create a .env file in the root directory with:');
    console.error('AOC_SESSION=your_session_cookie_here');
    console.error('');
    console.error('To get your session cookie:');
    console.error('1. Log into adventofcode.com with GitHub');
    console.error('2. Open browser DevTools (F12)');
    console.error('3. Go to Application/Storage > Cookies > https://adventofcode.com');
    console.error('4. Copy the value of the \'session\' cookie');
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const sessionMatch = envContent.match(/AOC_SESSION=(.+)/);
if (!sessionMatch) {
    console.error('Error: AOC_SESSION not found in .env file');
    process.exit(1);
}

const sessionCookie = sessionMatch[1].trim();

// Create folder structure if it doesn't exist
if (!fs.existsSync(folderPath)) {
    console.log(`Creating directory: ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
}

// Fetch input from Advent of Code
const url = `https://adventofcode.com/${year}/day/${day}/input`;
console.log(`Fetching input from: ${url}`);

const options = {
    headers: {
        'Cookie': `session=${sessionCookie}`,
        'User-Agent': 'github.com/BasKalkman/advent-of-code - automated input fetcher'
    }
};

https.get(url, options, (res) => {
    if (res.statusCode === 200) {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            // Write input to file
            fs.writeFileSync(inputFilePath, data);
            console.log(`✓ Input saved to: ${inputFilePath}`);

            // Create solution.js if it doesn't exist
            const solutionFilePath = path.join(folderPath, 'solution.js');
            if (!fs.existsSync(solutionFilePath)) {
                const solutionTemplate = `const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

// Part 1
function part1(input) {
  const lines = input.split('\\n');
  // TODO: Implement solution
  return 0;
}

// Part 2
function part2(input) {
  const lines = input.split('\\n');
  // TODO: Implement solution
  return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
`;
                fs.writeFileSync(solutionFilePath, solutionTemplate);
                console.log(`✓ Created solution template: ${solutionFilePath}`);
            }
        });
    } else if (res.statusCode === 400) {
        console.error('Error: Invalid session cookie');
        console.error('Please update your .env file with a valid session cookie');
    } else if (res.statusCode === 404) {
        console.error(`Error: Puzzle not found (${year} day ${day})`);
        console.error('Make sure the puzzle has been released');
    } else {
        console.error(`Error: HTTP ${res.statusCode}`);
        res.on('data', (chunk) => {
            console.error(chunk.toString());
        });
    }
}).on('error', (err) => {
    console.error('Error fetching input:', err.message);
    process.exit(1);
});
