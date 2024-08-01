import { RuntimeInterface } from './runtimeInterface'
import devRuntime from './dev'
import prodRuntime from './prod'
import testRuntime from './test'
import sitRuntime from './sit'
let RUNTIME: RuntimeInterface

if (process.env.NODE_ENV === 'prod') {
    RUNTIME = prodRuntime
} else if (process.env.NODE_ENV === 'sit') {
    RUNTIME = sitRuntime
} else if (process.env.NODE_ENV === 'test') {
    RUNTIME = testRuntime
} else {
    RUNTIME = devRuntime
}

export { RUNTIME }
