#!/usr/bin/env deno --allow-run
import sh from './mod.js'

(async function main() { // denoland/deno #471A
    console.log('> await sh`whoami`')
    console.log(JSON.stringify(await sh`whoami`))

    console.log()

    console.log("> (await sh`ls -a`).split('\\n')")
    console.log(JSON.stringify((await sh`ls -a`).split('\n')))
})()
