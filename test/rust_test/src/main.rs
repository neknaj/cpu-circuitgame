#[path = "../../module/program.rs"]
mod program;
use program::modules::*;

fn main() {}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Instant;

    // 整数をブール配列に変換する関数
    fn int_to_bool_array(i: i32, bits: usize) -> Vec<bool> {
        let mut result = vec![false; bits];
        for j in 0..bits {
            result[j] = (i & (1 << j)) != 0;
        }
        result
    }

    // 汎用テスト関数
    fn test_anybit<F>(module_name: &str, func: F, bits: &[usize], result_bits: Option<usize>)
    where
        F: Fn(&[i32]) -> i32,
    {
        let result_bits = result_bits.unwrap_or(bits[0]);

        fn test_case<F>(
            args: &mut Vec<i32>,
            index: usize,
            bits: &[usize],
            func: &F,
            result_bits: usize,
            module_name: &str,
        ) where
            F: Fn(&[i32]) -> i32,
        {
            if index == bits.len() {
                let bool_args: Vec<bool> = args
                    .iter()
                    .zip(bits.iter())
                    .flat_map(|(&arg, &bit_count)| int_to_bool_array(arg, bit_count))
                    .collect();

                let expected_int = func(args);
                let expected = int_to_bool_array(expected_int, result_bits);

                match module_name {
                    "nor" => assert_eq!(nor::func(bool_args[0], bool_args[1])[0], expected[0]),
                    "and" => assert_eq!(and::func(bool_args[0], bool_args[1])[0], expected[0]),
                    "or" => assert_eq!(or::func(bool_args[0], bool_args[1])[0], expected[0]),
                    "xor" => assert_eq!(xor::func(bool_args[0], bool_args[1])[0], expected[0]),
                    "not" => assert_eq!(not::func(bool_args[0])[0], expected[0]),
                    "_true" => assert_eq!(r#true::func(bool_args[0])[0], expected[0]),
                    "_false" => assert_eq!(r#false::func(bool_args[0])[0], expected[0]),
                    _ => panic!("Unknown module: {}", module_name),
                }
                return;
            }

            for val in 0..(1 << bits[index]) {
                args.push(val);
                test_case(args, index + 1, bits, func, result_bits, module_name);
                args.pop();
            }
        }

        let mut args = Vec::new();
        test_case(&mut args, 0, bits, &func, result_bits, module_name);
    }

    // ALUのテスト用関数
    fn test_alu(operation_name: &str, operand: [bool; 3], alu_inputs: fn(i32, i32) -> i32) {
        for i in 0..256 {
            let input1 = int_to_bool_array(i, 8);
            for j in 0..256 {
                let input2 = int_to_bool_array(j, 8);
                let expected_i8 = alu_inputs(i, j);
                let expected = int_to_bool_array(expected_i8 & 0xFF, 8);

                let result = ALU::func(
                    operand[0], operand[1], operand[2],
                    input1[0], input1[1], input1[2], input1[3],
                    input1[4], input1[5], input1[6], input1[7],
                    input2[0], input2[1], input2[2], input2[3],
                    input2[4], input2[5], input2[6], input2[7],
                );

                assert_eq!(
                    result.to_vec(),
                    expected,
                    "Failed on operation {} with inputs {} and {}", 
                    operation_name, i, j
                );
            }
        }
    }

    #[test]
    fn test_basic_gates() {
        // 基本ゲートのテスト
        test_anybit("nor", |args| !(args[0] | args[1]) & 1, &[1, 1], Some(1));
        test_anybit("and", |args| (args[0] & args[1]) & 1, &[1, 1], Some(1));
        test_anybit("or", |args| (args[0] | args[1]) & 1, &[1, 1], Some(1));
        test_anybit("xor", |args| (args[0] ^ args[1]) & 1, &[1, 1], Some(1));
        test_anybit("not", |args| !args[0] & 1, &[1], Some(1));
        test_anybit("_true", |_| 1, &[1], Some(1));
        test_anybit("_false", |_| 0, &[1], Some(1));
    }

    #[test]
    fn test_alu_operations() {
        let operands = [
            [false, false, false], // OR
            [true, false, false],  // NAND
            [false, true, false],  // NOR
            [true, true, false],   // AND
            [false, false, true],  // ADD
            [true, false, true],   // SUB
        ];

        let test_cases: Vec<(&str, [bool; 3], fn(i32, i32) -> i32)> = vec![
            ("OR", operands[0], |a: i32, b: i32| a | b),
            ("NAND", operands[1], |a: i32, b: i32| !(a & b) & 0xFF),
            ("NOR", operands[2], |a: i32, b: i32| !(a | b) & 0xFF),
            ("AND", operands[3], |a: i32, b: i32| a & b),
            ("ADD", operands[4], |a: i32, b: i32| (a + b) & 0xFF),
            ("SUB", operands[5], |a: i32, b: i32| (a - b) & 0xFF),
        ];

        for (name, operand, func) in test_cases {
            test_alu(name, operand, func);
        }
    }
}
