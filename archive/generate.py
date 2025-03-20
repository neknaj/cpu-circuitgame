def generate_circuit():
    # 各ビットの否定と元の信号を使ってAND条件を生成
    def generate_and_terms(number):
        binary = format(number, '08b')
        
        terms = []
        for i, bit in enumerate(''.join(list(reversed(binary)))):
            if bit == '0':
                terms.append(f'n{i}')
            else:
                terms.append(f'i{i}')
        return ' '.join(terms)

    # 回路全体の生成
    print("func 8bit_encoder(i0 i1 i2 i3 i4 i5 i6 i7) -> (")
    
    # 出力信号の宣言（0-254）
    outputs = []
    for i in range(255):
        outputs.append(f'out{i}')
    print('    ' + ' '.join(outputs))
    print(') {')
    
    # 否定信号の生成
    print('    // 入力信号の否定を生成')
    for i in range(8):
        print(f'    n{i} = not i{i};')
    print()
    
    # 各数値のAND条件生成
    print('    // 255通りのパターン生成')
    for i in range(256):
        condition = generate_and_terms(i)
        print(f'    out{i} = 8bit_and {condition};')
    
    print('}')

# 回路生成の実行
generate_circuit()
