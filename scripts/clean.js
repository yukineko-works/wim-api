import fs from 'node:fs'
import root from 'app-root-path'

const buildPath = root.resolve('dist')
if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { recursive: true })
}