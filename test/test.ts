import { styleText } from 'node:util';
import { FixedLengthArray, Modules } from "./module/small_stack_machine.js";


console.log("Test start")
const start = process.hrtime();


test_func_8x1_8("buf8bits", u8ToBoolArray, (x) => x.map(y => y) as FixedLengthArray<boolean, 8>);
test_func_8x1_8("not8bits", u8ToBoolArray, (x) => x.map(y => !y) as FixedLengthArray<boolean, 8>);
test_func_8x2_8("and8bits", u8ToBoolArray, (x) => groupArray(x).map((b) => b[0] && b[1]) as FixedLengthArray<boolean, 8>);
test_func_8x2_8("or8bits", u8ToBoolArray, (x) => groupArray(x).map((b) => b[0] || b[1]) as FixedLengthArray<boolean, 8>);
test_func_8x2_8("xor8bits", u8ToBoolArray, (x) => groupArray(x).map((b) => b[0] ^ b[1] ? true : false) as FixedLengthArray<boolean, 8>);

test_func_8x2_8("add8bits", u8ToBoolArray, (x) => u8ToBoolArray(boolArrayToU8(x.slice(0, 8) as FixedLengthArray<boolean, 8>) + boolArrayToU8(x.slice(8, 16) as FixedLengthArray<boolean, 8>)));
test_func_8x2_8("sub8bits", u8ToBoolArray, (x) => u8ToBoolArray(boolArrayToU8(x.slice(0, 8) as FixedLengthArray<boolean, 8>) - boolArrayToU8(x.slice(8, 16) as FixedLengthArray<boolean, 8>)));

test_func_8x2_8("increment8bits", u8ToBoolArray, (x) => u8ToBoolArray(boolArrayToU8(x.slice(0, 8) as FixedLengthArray<boolean, 8>) + 1));
test_func_8x2_8("decrement8bits", u8ToBoolArray, (x) => u8ToBoolArray(boolArrayToU8(x.slice(0, 8) as FixedLengthArray<boolean, 8>) - 1));

const end = process.hrtime(start);
const timeInMilliseconds = (end[0] * 1000 + end[1] / 1e6) / 1e3;
console.log(`Execution time: ${timeInMilliseconds.toFixed(5)} s`);


function test_func_8x1_8(name: string, fn1: (x: number) => FixedLengthArray<boolean, 8>, ref: (x: FixedLengthArray<boolean, 8>) => FixedLengthArray<boolean, 8>) {
    let failed = false;
    console.assert(Modules[name].inputsLen == 8 || Modules[name].outputsLen == 8, `[func type] ${name}`);
    for (let a = 0x00; a < 0xff; a++) {
        const input = fn1(a);
        if (!arrEqual(Modules[name].func(...input), ref([...input]))) {
            failed = true;
            console.error(`Test: `, a, Modules[name].func(...input).map(x => x ? "t" : "f").join(""), ref([...input]).map(x => x ? "t" : "f").join(""))
        }
    }
    console.log(`Test: ${name}`, styleText(!failed ? "blueBright" : "redBright", !failed ? "ok" : "error"))
}

function test_func_8x2_8(name: string, fn1: (x: number) => FixedLengthArray<boolean, 8>, ref: (x: FixedLengthArray<boolean, 16>) => FixedLengthArray<boolean, 8>) {
    let failed = false;
    console.assert(Modules[name].inputsLen == 8 || Modules[name].outputsLen == 8, `[func type] ${name}`);
    for (let a = 0x00; a < 0xff; a++) {
        for (let b = 0x00; b < 0xff; b++) {
            const inputA = fn1(a);
            const inputB = fn1(b);
            if (!arrEqual(Modules[name].func(...inputA, ...inputB) as FixedLengthArray<boolean, 8>, ref([...inputA, ...inputB]))) {
                failed = true;
                console.error(`Test: `, a, b, Modules[name].func(...inputA, ...inputB).map(x => x ? "t" : "f").join(""), ref([...inputA, ...inputB]).map(x => x ? "t" : "f").join(""))
            }
        }
    }
    console.log(`Test: ${name}`, styleText(!failed ? "blueBright" : "redBright", !failed ? "ok" : "error"))
}


// function i8ToBoolArray(i8: number): FixedLengthArray<boolean, 8> {
//     // Convert an 8-bit integer to a boolean[8] array
//     const boolArray = Array.from({ length: 8 }, (_, index) => (i8 & (1 << index)) !== 0);
//     return boolArray as FixedLengthArray<boolean, 8>;
// }

// function boolArrayToI8(boolArray: FixedLengthArray<boolean, 8>): number {
//     // Convert a boolean[8] array to an 8-bit integer
//     return boolArray.reduce((acc, bit, index) => acc | (bit ? 1 << index : 0), 0);
// }

function u8ToBoolArray(u8: number): FixedLengthArray<boolean, 8> {
    // Convert an 8-bit unsigned integer to a boolean[8] array
    const boolArray = Array.from({ length: 8 }, (_, index) => (u8 & (1 << index)) !== 0);
    return boolArray as FixedLengthArray<boolean, 8>;
}

function boolArrayToU8(boolArray: FixedLengthArray<boolean, 8>): number {
    // Convert a boolean[8] array to an 8-bit unsigned integer
    return boolArray.reduce((acc, bit, index) => acc | (bit ? 1 << index : 0), 0);
}

function groupArray(inputArray) {
    const result = [];
    const halfLength = inputArray.length / 2;
    for (let i = 0; i < halfLength; i++) {
        result.push([inputArray[i], inputArray[i + halfLength]]);
    }
    return result;
}

function arrEqual(array1, array2) {
    if (array1.length !== array2.length) return false; // 長さが異なる場合は即座にfalse
    return array1.every((value, index) => value === array2[index]);
}