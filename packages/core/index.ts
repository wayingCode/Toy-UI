import { makeInstaller } from '@toy-ui/utils'
import components from './components'
const installer = makeInstaller(components)
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import '@toy-ui/theme/index.css'
export * from '@toy-ui/components'
export default installer