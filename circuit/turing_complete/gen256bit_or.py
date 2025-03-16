def generate_code(bit):
    # 関数宣言部: 256個の入力ビット i0～i255 を列挙
    header = "func 256bit_or(i(256)) -> (bool) {"
    print(header)

    # ステージ1: a0～a31 の生成（各行は「aX = 8bit_or i[start:end];」形式）
    for a in range(256 // bit):
        start = bit * a
        end = start + bit - 1  # ユーザー指定の通り、i[start:end] とする
        print(f"    a{a} = {bit}bit_or i[{start},{end}];")
    print()

    # ステージ2: a を入力として b0～b3 を生成
    for b in range(32 // bit):
        start = bit * b
        end = start + bit - 1
        print(f"    b{b} = {bit}bit_or a[{start}:{end}];")
    print()

    # ステージ3: b0～b3 をORして最終的なbool値を作成
    print("    bool = 4or b0 b1 b2 b3;")
    print("}")


if __name__ == "__main__":
    generate_code(16)
