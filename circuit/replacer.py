import re
import sys
import difflib

def replace_sequential_numbers(code):
    """
    Finds patterns like a[0:7], a[00:07], a[0:f] in the code and replaces them with sequential hexadecimal numbers.

    Args:
        code: The input code string.

    Returns:
        The modified code string with sequential numbers replaced.
    """

    def replace_match(match):
        base = match.group(1)
        start_str = match.group(2)
        end_str = match.group(3)

        # Determine if it's hexadecimal or decimal and the padding
        if any(c in 'abcdef' for c in start_str.lower()) or any(c in 'abcdef' for c in end_str.lower()):
            start = int(start_str, 16)
            end = int(end_str, 16)
            padding = len(start_str)
            separator = ' '
            
            # Generate the sequential numbers
            sequence = [f"{base}{i:0{padding}x}" for i in range(start, end + 1)]
        else:
            start = int(start_str)
            end = int(end_str)
            padding = len(start_str)
            separator = ' '

            # Generate the sequential numbers
            sequence = [f"{base}{i:0{padding}}" for i in range(start, end + 1)]

        return separator.join(sequence)

    # Regular expression to find patterns like a[0:7], a[00:07], a[0:f]
    pattern = r"([a-zA-Z_]+)\[(0?[0-9a-fA-F]+):(0?[0-9a-fA-F]+)\]"
    
    # Replace the patterns with sequential numbers
    modified_code = re.sub(pattern, replace_match, code)

    return modified_code

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python replacer.py <filename>")
        sys.exit(1)

    filename = sys.argv[1]
    try:
        with open(filename, 'r') as f:
            code = f.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)

    modified_code = replace_sequential_numbers(code)

    # Calculate the diff
    diff = difflib.unified_diff(code.splitlines(keepends=True),
                                modified_code.splitlines(keepends=True),
                                fromfile=filename,
                                tofile=filename)

    # Print the diff
    print("".join(diff))

    # Write the modified code back to the file
    with open(filename, 'w') as f:
        f.write(modified_code)