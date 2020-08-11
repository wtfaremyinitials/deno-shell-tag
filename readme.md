deno-shell-tag
=========

> The simplest way to use a \*nix tools in deno

```ts
import sh from 'https://deno.land/x/shell_tag/mod.js'

let files = await sh`ls -a`
console.log(files.split('\n'))
//=> ['.', '..', 'example.js', 'mod.js', 'readme.md']
```
