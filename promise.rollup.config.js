import path  from 'path';
import ts  from 'rollup-plugin-typescript2';
import {nodeResolve} from '@rollup/plugin-node-resolve'
export default {
    input:'src/2.promise/index.ts',
    output:{
        exports:'auto',
        format:'cjs', // commonjs 规范 umd esm iife
        file:path.resolve(`1.promise/promise.js`)
    },
    plugins:[
        ts({
            tsconfig:path.resolve(`tsconfig.json`)
        }),
        nodeResolve({
            extensions:['.js','.ts']
        })
    ]
}
