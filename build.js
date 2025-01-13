import esbuild from "esbuild";

// esbuild.build({
//     entryPoints: ["test/module/small_stack_machine.ts"],
//     outfile: './test/module/small_stack_machine.js',
//     tsconfig: './tsconfig.json',
//     bundle: false,
//     minify: true,
//     platform: "node",
//     format: "esm",
//     sourcemap: false,
//     target: ["node22"],
//     sourcemap: false,
// }).then(() => {
//     console.log("Build succeeded.");
// }).catch(() => process.exit(1));



esbuild.build({
    entryPoints: ["test/test.ts"],
    outfile: './test/test.js',
    tsconfig: './tsconfig.json',
    bundle: false,
    // minify: true,
    platform: "node",
    format: "esm",
    sourcemap: false,
    target: ["node22"],
    sourcemap: false,
}).then(() => {
    console.log("Build succeeded.");
}).catch(() => process.exit(1));
