# CPU on Circuit Game
making CPU on [Circuit Game](https://neknaj.github.io/circuitgame/)

## Usage

Build [circuitgame](https://github.com/neknaj/circuitgame).
```sh
cargo build -r
```
Copy `/target/release/circuitgame_bin` to this repository.

```
./circuitgame_bin -i ./circuit/sample.ncg
```

## Help(2025-1-10)

```sh
./circuitgame_bin --help
```

```sh
< Neknaj Circuit Game >
Usage: circuitgame_bin [OPTIONS]

Options:
  -i, --input <Input File Path>       Input file
  -o, --output <Output NCGb to File>  
  -s, --server <Open server for API>  [possible values: true, false]
  -h, --help                          Print help
  ```

## License
This project is licensed under the MIT License.