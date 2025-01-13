# CPU on Circuit Game
making CPU on [Circuit Game](https://neknaj.github.io/circuitgame/)  

## Build CircuitGame CLI Tool
- Clone  
    ```sh
    git clone https://github.com/neknaj/circuitgame
    ```
- Build  
    ```sh
    cd circuitgame
    git pull
    cargo build --release
    cd ..
    cp ./circuitgame/target/release/circuitgame_bin ./ncg
    ./ncg -i circuit/turing_complete/turing_complete.ncg -s true -d doc/turing_complete.md
    ```

## Develop
### Open Server and Debug in Web Browser
- run  
    ```sh
    ./ncg -i circuit/sample.ncg -d doc/sample.md -s 8081
    ```
- open in your browser  
    https://neknaj.github.io/circuitgame/?socket=ws://localhost:8081  
### Create Document
```sh
./ncg -i circuit/sample.ncg -d doc/sample.ncg
```
### Transpile
- one module
    ```sh
    ./ncg -i circuit/sample.ncg -o test/module/sample.ts -m fAddr
    ```
- all modules
    ```sh
    ./ncg -i circuit/sample.ncg -o test/module/sample.ts -m .*
    ```

## Help(2025-1-12)

```sh
ncg --help
```

```sh
Usage: ncg [OPTIONS]

Options:
  -i, --input <Input File Path>             Input file
  -o, --output <Output File Path>
  -d, --docOut <Document output File Path>
  -m, --module <Name of module to compile>
  -s, --server <Open server for API>
  -w, --watch <File Watch>                  [possible values: true, false]
      --vm <Run VM>                         [possible values: true, false]
  -h, --help                                Print help
  ```

## License
This project is licensed under the MIT License.  