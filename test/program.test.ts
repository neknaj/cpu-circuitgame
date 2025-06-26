import { FixedLengthArray, Modules } from "./module/program";
import { test, expect, describe, it } from "bun:test";
/**
 * 整数を指定ビット数のブール配列に変換する関数
 * @param i 変換する整数
 * @param bits ビット数
 * @returns boolean[]（長さ bits）
 */
function intToBoolArray(i: number, bits: number): boolean[] {
    const result: boolean[] = new Array(bits).fill(false);
    for (let j = 0; j < bits; j++) {
        result[j] = !!(i & (1 << j));
    }
    return result
}

/**
 * 汎用テスト関数
 * @param moduleName モジュール名
 * @param func 数値での計算結果を返すテスト対象関数（例：(a, b) => ~(a | b)）
 * @param bits 各引数のビット数を示す配列
 * @param resultBits 出力のビット数（省略時は bits[0] を使用）
 */
function test_anybit(
    moduleName: string,
    func: (...args: number[]) => number,
    bits: number[],
    resultBits: number = bits[0]
) {
    it(moduleName, () => {
        // 再帰的に全パターンの組み合わせを生成する関数
        function testCase(args: number[], index: number) {
            if (index === bits.length) {
                // 各引数の数値を、それぞれ対応するビット数のブール配列に変換し、平坦化する
                const boolArgs = args.flatMap((arg, i) => intToBoolArray(arg, bits[i]));
                // 数値で計算した期待値を取得
                const expectedInt = func(...args);
                // 期待値を、出力のビット数に合わせたブール配列に変換
                let expectedBool: boolean[] | boolean = intToBoolArray(expectedInt, resultBits);
                // Modules[moduleName].func は、ブール値の展開された配列を引数として受け取る前提
                if (JSON.stringify(Modules[moduleName].func(...boolArgs)) !== JSON.stringify(expectedBool)) {
                    console.log()
                }
                expect(Modules[moduleName].func(...boolArgs)).toEqual(expectedBool);
                return;
            }
            // 現在の引数 index に対して、全パターン（0 ～ 2^bits[index]-1）を試す
            for (let val = 0; val < (1 << bits[index]); val++) {
                testCase([...args, val], index + 1);
            }
        }
        testCase([], 0);
    });
}
function testALU(operationName: string, operand: [boolean, boolean, boolean], ALUinputs: (a: number, b: number) => number) {
    it(operationName, () => {
        for (let i = 0; i < 256; i++) {
            const input1 = intToBoolArray(i, 8) as FixedLengthArray<boolean, 8>; // Convert i to boolean[8]
            for (let j = 0; j < 256; j++) {
                const input2 = intToBoolArray(j, 8) as FixedLengthArray<boolean, 8>; // Convert j to boolean[8]
                const expectedI8 = ALUinputs(i, j); // Perform the bitwise operation on integers
                const expected = intToBoolArray(expectedI8, 8); // Convert result to boolean[8]
                expect(Modules["ALU"].func(...operand, ...input1, ...input2)).toEqual(expected);
            }
        }
    });
}

// test("nor", () => test_anybit("nor", (a, b) => ~(a | b), [1, 1]))
describe("BASIC", () => {
    test_anybit("nor", (a, b) => ~(a | b), [1, 1]);
    test_anybit("true", (a) => 1, [1]);
    test_anybit("false", (a) => 0, [1]);
    test_anybit("not", (a) => ~a, [1]);
    test_anybit("and", (a, b) => (a & b), [1, 1]);
    test_anybit("or", (a, b) => (a | b), [1, 1]);
    test_anybit("xor", (a, b) => (a ^ b), [1, 1]);
})
describe("adder", () => {
    //     test_anybit("haddr", (a, b) => (a + b), [1, 1], 2);
    //     test_anybit("faddr", (a, b, c) => (a + b + c), [1, 1, 1], 2);
    test_anybit("8bit_addr", (a, b) => (a + b), [8, 8]);
})
describe("3bit", () => {
    test_anybit("3or", (a, b, c) => (a | b | c), [1, 1, 1]);
})
describe("4bit", () => {
    test_anybit("4or", (a, b, c, d) => (a | b | c | d), [1, 1, 1, 1]);
    test_anybit("4and", (a, b, c, d) => (a & b & c & d), [1, 1, 1, 1]);
    test_anybit("4bit_and", (a, b) => (a & b), [4, 4]);
})
describe("8bit", () => {
    test_anybit("8not", (a) => ~a, [8]);
    test_anybit("8or", (a, b, c, d, e, f, g, h) => (a | b | c | d | e | f | g | h), [1, 1, 1, 1, 1, 1, 1, 1]);
    test_anybit("8bit_or", (a, b) => (a | b), [8, 8]);
    test_anybit("8bit_and", (a, b) => (a & b), [8, 8]);
    test_anybit("8bit_nor", (a, b) => ~(a | b), [8, 8]);
    test_anybit("8inc", (a) => a + 1, [8]);
    test_anybit("8nagate", (a) => -a, [8]);
})
describe("decoder", () => {
    test_anybit("2decoder", (a, b) => 1 << (b * 2 + a), [1, 1], 4);
    test_anybit("3decoder", (a, b, c) => 1 << (c * 4 + b * 2 + a), [1, 1, 1], 8);
    test_anybit("4decoder", (a, b, c, d) => 1 << (d * 8 + c * 4 + b * 2 + a), [1, 1, 1, 1], 16);
    // 多すぎてエラー
    // test_anybit("8decoder", (a, b, c, d, e, f, g, h) => 1 << (h * 128 + g * 64 + f * 32 + e * 16 + d * 8 + c * 4 + b * 2 + a), [1, 1, 1, 1, 1, 1, 1, 1], 256)
})
describe("スイッチ制御", () => {
    test_anybit("4switch", (a, swc) => swc ? a : 0, [4, 1]);
    test_anybit("8switch", (a, swc) => swc ? a : 0, [8, 1]);
    test_anybit("selector", (a, b, swc) => swc ? a : b, [8, 8, 1]);
    test_anybit("16switch", (a, swc) => swc ? a : 0, [16, 1]);
})
describe("巨大or", () => {
    test_anybit("6or", (a, b, c, d, e, f) => (a | b | c | d | e | f), [1, 1, 1, 1, 1, 1])
    test_anybit("9or", (a, b, c, d, e, f, g, h, i) => (a | b | c | d | e | f | g | h | i), [1, 1, 1, 1, 1, 1, 1, 1, 1])
    test_anybit("16or", (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af) => (a0 | a1 | a2 | a3 | a4 | a5 | a6 | a7 | a8 | a9 | aa | ab | ac | ad | ae | af), [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    // 多いだけなので割愛
    // test_anybit("32or",(a)=> )
    // test_anybit("64or",(a)=> )
    // test_anybit("256or",(a)=> )
})
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
test_anybit("condition", (value, operand) => {
    // 8ビットの2の補数表現として `value` を解釈
    const signedValue = value >= 128 ? value - 256 : value;

    switch (operand) {
        case 0: return 0;
        case 1: return Number(signedValue == 0);
        case 2: return Number(signedValue < 0);
        case 3: return Number(signedValue <= 0);
        case 4: return 1;
        case 5: return Number(signedValue != 0);
        case 6: return Number(signedValue >= 0);
        case 7: return Number(signedValue > 0);
    }
}, [8, 3], 1);

function parsePattern(pat: string): [boolean[], boolean[]] {
    let [input, output] = pat.split("->");
    const parseBoolArray = (str: string) => str.replaceAll(";", "")
        .split("")
        .filter(x => x !== " ")
        .map(x => x === "t" || x === "1");
    let boolArgs = parseBoolArray(input);
    let expectedBool = parseBoolArray(output);
    return [boolArgs, expectedBool];
}
function format(booleans: boolean[]): string {
    // 1. boolean を 't' または 'f' に変換
    const chars = booleans.map(b => b ? 't' : 'f');

    // 2. 4文字ずつの塊（ニブル文字列）を作成
    const nibbles: string[] = [];
    for (let i = 0; i < chars.length; i += 4) {
        // 配列を4要素ずつスライスし、スペースなしで結合して塊にする
        nibbles.push(chars.slice(i, i + 4).join(''));
    }

    // 3. 作成した塊（ニブル文字列）をスペースで結合
    return nibbles.join(' ');
}

test("turing_complete", () => {
    const tc = new Modules["turing_complete"]();
    const patterns = [
        // 何もないことを確認する
        //1 234 567 89ab cdef -> 0123 4567 89ab cdef C 
        // "ff fff fff ffff ffff -> ffff ffff ffff ffff f;",
        // COPY INPUT -> OUTPUT
        // "tf ttf ttf 0000 0000 -> 0000 0000 ffff ffff f;",
        // COPY INPUT -> REG0
        "tf ttf fff 1010 1010 -> ffff ffff ffff ffff f;",
        "10 000 110 0000 0000 -> 1010 1010 0000 0000 0;",   // check
        // IMM 5
        "00 000 101 ffff ffff -> ffff ffff ffff ffff f;",
        "10 000 110 ffff ffff -> 1010 0000 ffff ffff f;",   // check
        // COPY REG0 -> REG1
        "10 000 001 ffff ffff -> ffff ffff ffff ffff f;",
        "10 001 110 ffff ffff -> 1010 0000 ffff ffff f;",   // check
        // COPY INPUT REG2
        "10 110 010 1101 0000 -> ffff ffff ffff ffff f;",
        "10 010 110 ffff ffff -> 0000 0000 ffff ffff f;",   // check
        // CALC ADD -> REG3
        "01 000 100 ffff ffff -> ffff ffff ffff ffff f;",
        "10 011 110 ffff ffff -> 1110 0000 ffff ffff f;",   // check
        // MOV REG3 -> OUT
        "10 011 110 ffff ffff -> 1111 1000 ffff ffff f;",
    ];

    patterns.forEach(pat => {
        let [boolArgs, expectedBool] = parsePattern(pat);
        tc.inputs(boolArgs);
        tc.next();
        tc.next();
        expect(format(tc.next().outputs)).toEqual(format(expectedBool));
    });
})