deno-shell-tag
=========

> The simplest way to use a \*nix tools in deno

```ts
import sh from 'https://denopkg.com/wtfaremyinitials/deno-shell-tag/mod.js'

let files = await sh`ls -a`
console.log(files.split('\n'))
//=> ['.', '..', 'example.js', 'mod.js', 'readme.md']
```
