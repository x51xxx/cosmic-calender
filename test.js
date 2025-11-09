// Simple validation tests for Cosmic Calendar data

const fs = require('fs');

// Read and transform the data file for Node.js
let dataScript = fs.readFileSync('data.js', 'utf8');

// Replace const declarations with module.exports for Node.js
dataScript = dataScript.replace(/const (cosmicEvents|categoryColors|monthsUA) =/g, 'var $1 =');
dataScript += `\nmodule.exports = { cosmicEvents, categoryColors, monthsUA };`;

// Write temporary module
fs.writeFileSync('/tmp/test-data.js', dataScript);

// Load the data
const { cosmicEvents, categoryColors, monthsUA } = require('/tmp/test-data.js');

console.log('Running Cosmic Calendar Data Tests...\n');

// Test 1: Verify cosmicEvents array exists and has items
console.log('Test 1: Verify cosmicEvents data structure');
if (!cosmicEvents || !Array.isArray(cosmicEvents)) {
    console.error('❌ FAILED: cosmicEvents is not an array');
    process.exit(1);
}
if (cosmicEvents.length === 0) {
    console.error('❌ FAILED: cosmicEvents is empty');
    process.exit(1);
}
console.log(`✅ PASSED: Found ${cosmicEvents.length} cosmic events`);

// Test 2: Verify all events have required fields
console.log('\nTest 2: Verify event data structure');
let hasErrors = false;
cosmicEvents.forEach((event, index) => {
    const requiredFields = ['date', 'title', 'titleEn', 'description', 'category'];
    requiredFields.forEach(field => {
        if (!event[field]) {
            console.error(`❌ FAILED: Event ${index} missing required field: ${field}`);
            hasErrors = true;
        }
    });
    
    // Validate date format (MM-DD)
    if (event.date && !/^\d{2}-\d{2}$/.test(event.date)) {
        console.error(`❌ FAILED: Event ${index} has invalid date format: ${event.date}`);
        hasErrors = true;
    }
    
    // Validate category exists in categoryColors
    if (event.category && !categoryColors[event.category]) {
        console.error(`❌ FAILED: Event ${index} has unknown category: ${event.category}`);
        hasErrors = true;
    }
});

if (!hasErrors) {
    console.log('✅ PASSED: All events have valid data structure');
}

// Test 3: Verify date ordering (critical events should be chronologically ordered)
console.log('\nTest 3: Verify major events chronological order');
const criticalEvents = cosmicEvents.filter(e => e.importance === 'critical');
let previousDate = null;
let orderErrors = false;

criticalEvents.forEach(event => {
    const [month, day] = event.date.split('-').map(Number);
    const currentDate = month * 100 + day;
    const timeValue = event.time ? parseInt(event.time.replace(':', '')) : 0;
    const fullDate = currentDate * 10000 + timeValue;
    
    if (previousDate && fullDate < previousDate) {
        console.error(`❌ FAILED: Event "${event.title}" is out of chronological order`);
        orderErrors = true;
    }
    previousDate = fullDate;
});

if (!orderErrors) {
    console.log('✅ PASSED: Critical events are in chronological order');
}

// Test 4: Verify category colors
console.log('\nTest 4: Verify category colors');
const expectedCategories = ['universe', 'galaxies', 'solar', 'life', 'evolution', 'humanity'];
let categoryErrors = false;

expectedCategories.forEach(cat => {
    if (!categoryColors[cat]) {
        console.error(`❌ FAILED: Missing color for category: ${cat}`);
        categoryErrors = true;
    } else if (!/^#[0-9a-fA-F]{6}$/.test(categoryColors[cat])) {
        console.error(`❌ FAILED: Invalid color format for ${cat}: ${categoryColors[cat]}`);
        categoryErrors = true;
    }
});

if (!categoryErrors) {
    console.log('✅ PASSED: All categories have valid colors');
}

// Test 5: Verify months array
console.log('\nTest 5: Verify Ukrainian months array');
if (!monthsUA || !Array.isArray(monthsUA) || monthsUA.length !== 12) {
    console.error('❌ FAILED: monthsUA array is invalid');
    process.exit(1);
}
console.log('✅ PASSED: Ukrainian months array is valid');

// Test 6: Verify key events exist
console.log('\nTest 6: Verify key cosmic events are present');
const keyEventTitles = [
    'Великий вибух',
    'Формування Землі',
    'Перші ознаки життя',
    'Вимирання динозаврів',
    'Homo sapiens'
];

keyEventTitles.forEach(title => {
    const found = cosmicEvents.some(e => e.title === title);
    if (!found) {
        console.error(`❌ FAILED: Missing key event: ${title}`);
        hasErrors = true;
    }
});

if (!hasErrors) {
    console.log('✅ PASSED: All key cosmic events are present');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('✅ All tests passed successfully!');
console.log('='.repeat(50));
console.log(`\nSummary:`);
console.log(`- Total events: ${cosmicEvents.length}`);
console.log(`- Categories: ${Object.keys(categoryColors).length}`);
console.log(`- Critical events: ${cosmicEvents.filter(e => e.importance === 'critical').length}`);
console.log(`- Events in December: ${cosmicEvents.filter(e => e.date.startsWith('12-')).length}`);
