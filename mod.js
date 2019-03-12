// TODO: typescriptify
export function configure(opts) {
    const {
        ignoreExitCode = false, // throws on exit code != 0
        encoding = 'utf-8',     // null for Uint8Array or TextDecoder encoding
        trim = true,            // trim string output. invalid for encoding null
    } = opts

    if (encoding == null && trim) {
        throw new Error('Must specify an encoding if trim is enabled')
    }

    return async function shell(strings, ...keys) {
        let command = strings[0]
        for (let i = 1; i < strings.length; i++) {
            command += keys[i - 1].toString()
            command += strings[i]
        }

        let proc = Deno.run({
            args: ['/bin/sh', '-c', command],
            stdin: 'piped',
            stdout: 'piped',
            stderr: 'piped',
        })

        let stdout = await proc.output()
        let { code } = await proc.status()

        if (code != 0 && !ignoreExitCode) {
            let decoder = new TextDecoder('utf-8')
            let stderr = await Deno.readAll(proc.stderr)
            stderr = decoder.decode(stderr).trim()
            throw new Error(`Non-zero exit code: ${code} ${stderr}`)
        }

        if (encoding != null) {
            let decoder = new TextDecoder(encoding)
            stdout = decoder.decode(stdout)
        }

        if (trim) {
            stdout = stdout.trim()
        }

        return stdout
    }
}

export default configure({})
