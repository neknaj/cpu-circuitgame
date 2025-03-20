## build and copy
npm run build

## [0:7]などの展開
cd circuit
python replacer.py turing_complete/turing_complete.ncg


## run 
./ncg -i circuit/sample.ncg -o test/module/sample.ts 
./ncg -i circuit/turing_complete/turing_complete.ncg -d doc/turing_complete.md -s true
./ncg -i circuit/program.ncg -d doc/program.md -s true
./ncg -i circuit/small_stack_machine.ncg -s true

## test-bem
./ncg -i circuit/small_stack_machine.ncg -o test/module/small_stack_machine.ts -m .+
node build.js
node test/test.js



## test-wogikaze
./ncg -i circuit/turing_complete/turing_complete.ncg -o test/module/turing_complete.ts -d doc/turing_complete.md -m .+
./ncg -i circuit/program.ncg -o test/module/program.ts -d doc/program.md -m .+
npm run test
