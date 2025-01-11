# CPU on Circuit Game
making CPU on [Circuit Game](https://neknaj.github.io/circuitgame/)  

## Server
- Build  
    ```sh
    git clone https://github.com/neknaj/circuitgame
    cd circuitgame
    cargo build --release
    cd ..
    ```
- copy  
    ```sh
    # linux
    cp ./circuitgame/target/release/circuitgame_bin ./ncg
    # windows
    cp ./circuitgame/target/release/circuitgame_bin.exe ./ncg.exe
    ```
- run  
    ```sh
    ./ncg -i circuit/sample.ncg -s true
    ```
- open in your browser  
    https://neknaj.github.io/circuitgame/?socket=ws://localhost:8081

## Help(2025-1-10)

```sh
ncg --help
```

```sh
< Neknaj Circuit Game >
Usage: ./ncg [OPTIONS]

Options:
  -i, --input <Input File Path>       Input file
  -o, --output <Output NCGb to File>  
  -s, --server <Open server for API>  [possible values: true, false]
  -h, --help                          Print help
  ```

## License
This project is licensed under the MIT License.  