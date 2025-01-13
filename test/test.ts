import { Modules } from "./module/small_stack_machine.js";

// nor
for (let a of [true,false]) {
    for (let b of [true,false]) {
        console.assert(Modules.nor.inputsLen==2,`[func type] nor`);
        console.assert(Modules.nor.outputsLen==1,`[func type] nor`);
        // console.log("nor",a,b," ",...Modules.nor.func(a,b));
        console.assert(Modules.nor.func(a,b)[0]==(!(a|b)),`[func type] nor`,a,b,":",Modules.nor.func(a,b)[0],!(a|b));
    }
}