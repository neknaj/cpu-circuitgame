const fs = require('fs');
const path = require('path');

function generateJestCode(input) {
    // Step 1: Remove lines starting with //
    const cleanedInput = input.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');

    // Step 2: Split into test blocks based on the format test {module}:{inputs}->{outputs} {
    const testRegex = /test (\w+):(\d+)->(\d+) \{([\s\S]*?)\}/g;
    const jestBlocks = [];
    let match;

    while ((match = testRegex.exec(cleanedInput)) !== null) {
        const functionName = match[1];
        const inputs = parseInt(match[2], 10);
        const outputs = parseInt(match[3], 10);
        const rawTestCases = match[4].split(/\n/).map(line => line.trim()).filter(Boolean);

        // Group test cases
        const testCases = [];
        let currentCase = [];

        rawTestCases.forEach(line => {
            if (line.endsWith(';')) {
                currentCase.push(line);
                testCases.push(currentCase.join(' '));
                currentCase = [];
            } else {
                currentCase.push(line);
            }
        });

        // Process each test case
        const cases = testCases.map(line => {
            const [inputValues, outputValue] = line.split('->').map(part => part.trim().replace(';', ''));
            const inputArray = inputValues.split(' ').map(v => v === 't');
            const outputArray = outputValue.split(' ').map(v => v === 't');
            return { input: inputArray, output: outputArray };
        });

        // Generate Jest block
        const describeBlock = `describe('${functionName}', () => {
    ${cases.map(({ input, output }, index) => {
            return `it('should handle case #${index + 1}', () => {
        expect(Modules["${functionName}"].func(${input.map(v => v).join(', ')})).toEqual(${JSON.stringify(output)});
    });`;
        }).join('\n    ')}
});`;

        jestBlocks.push(describeBlock);
    }

    return jestBlocks.join('\n\n');
}

// Command-line interface
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node generator.js {file}.txt');
    process.exit(1);
}

const inputFilePath = args[0];
const outputFileName = path.basename(inputFilePath, '.ncg') + '.test.ts';
const outputFilePath = path.join('./test', outputFileName);

try {
    const inputContent = fs.readFileSync(inputFilePath, 'utf8');
    const jestCode = generateJestCode(inputContent);
    fs.writeFileSync(outputFilePath, jestCode);
    console.log(`Generated Jest test code saved to: ${outputFilePath}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
