import { makeInstaller } from '@toy-ui/utils'
import components from './components'
const installer = makeInstaller(components)
import '@toy-ui/theme/index.css'
export * from '@toy-ui/components'
export default installer