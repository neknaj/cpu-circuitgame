import { FixedLengthArray, Modules } from "./module/turing_complete";

function i8ToBoolArray(i8: number): FixedLengthArray<boolean, 8> {
    // ルックアップテーブルを使用
    return lookup[i8 & 0xFF] as FixedLengthArray<boolean, 8>;
}

function boolArrayToI8(boolArray: FixedLengthArray<boolean, 8>): number {
    // reduce を使用して1回のイテレーションで計算
    return boolArray.reduce((result, bool, i) => 
        result | (Number(bool) << i), 0);
}

// ルックアップテーブルの生成（初期化時に1回だけ実行）
const lookup = new Array(256).fill(0).map((_, n) => 
    Array.from({ length: 8 }, (_, i) => !!(n & (1 << i)))
);

it("should correctly convert between i8 and boolean[8]", () => {
    for (let i = 0; i < 256; i++) {
        const boolArray = i8ToBoolArray(i);
        const resultI8 = boolArrayToI8(boolArray);
        expect(resultI8).toBe(i);
    }
});

function testALU(operationName: string, operand: [boolean, boolean, boolean], ALUinputs: (a: number, b: number) => number) {
    it(operationName, () => {
        for (let i = 0; i < 256; i++) {
            const input1 = i8ToBoolArray(i); // Convert i to boolean[8]
            for (let j = 0; j < 256; j++) {
                const input2 = i8ToBoolArray(j); // Convert j to boolean[8]
                const expectedI8 = ALUinputs(i, j); // Perform the bitwise operation on integers
                const expected = i8ToBoolArray(expectedI8); // Convert result to boolean[8]
                expect(Modules["ALU"].func(...operand, ...input1, ...input2)).toEqual(expected);
            }
        }
    });
}
function test8bit(moduleName: string, func: (a: number) => number) {
    it(moduleName, () => {
        for (let i = 0; i < 256; i++) {
            const input1 = i8ToBoolArray(i); // Convert i to boolean[8]
            const expectedI8 = func(i); // Perform the bitwise operation on integers
            const expected = i8ToBoolArray(expectedI8); // Convert result to boolean[8]
            expect(Modules[moduleName].func(...input1)).toEqual(expected);

        }
    });
}
function test8x2bit(moduleName: string, func: (a: number, b: number) => number) {
    it(moduleName, () => {
        for (let i = 0; i < 256; i++) {
            const input1 = i8ToBoolArray(i); // Convert i to boolean[8]
            for (let j = 0; j < 256; j++) {
                const input2 = i8ToBoolArray(j); // Convert j to boolean[8]
                const expectedI8 = func(i, j); // Perform the bitwise operation on integers
                const expected = i8ToBoolArray(expectedI8); // Convert result to boolean[8]
                expect(Modules[moduleName].func(...input1, ...input2)).toEqual(expected);
            }
        }
    });
}

describe("ALU", () => {
    const operand: [boolean, boolean, boolean][] = [
        [false, false, false],
        [true, false, false],
        [false, true, false],
        [true, true, false],
        [false, false, true],
        [true, false, true],
    ];

    testALU("OR", operand[0], (a, b) => a | b);
    testALU("NAND", operand[1], (a, b) => ~(a & b));
    testALU("NOR", operand[2], (a, b) => ~(a | b));
    testALU("AND", operand[3], (a, b) => a & b);
    testALU("ADD", operand[4], (a, b) => a + b);
    testALU("SUB", operand[5], (a, b) => a - b);

});

test8bit("8buf", a => a);
test8bit("8not", a => ~a);
test8x2bit("8and", (a, b) => a & b);
test8x2bit("8or", (a, b) => a | b);
test8x2bit("8xor", (a, b) => a ^ b);

test8x2bit("8addr", (a, b) => a + b);
test8x2bit("8sub", (a, b) => a - b);

test8bit("8inc", a => a + 1);
test8bit("8dec", a => a - 1);