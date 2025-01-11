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

## License
This project is licensed under the MIT License.  