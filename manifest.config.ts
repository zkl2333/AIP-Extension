import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

const [major, minor, patch, label = '0'] = version.replace(/[^\d.-]+/g, '').split(/[.-]/)

export default defineManifest(async env => {
  return {
    name: env.mode === 'development' ? '[开发环境] AIP Extension' : 'AIP Extension',
    description: 'AIP 的浏览器插件',
    version: `${major}.${minor}.${patch}.${label}`,
    manifest_version: 3,
    action: {
      default_title: '点击打开',
      default_popup: 'popup.html'
    },
    background: {
      service_worker: 'src/background.ts',
      type: 'module'
    },
    host_permissions: ['*://*/*'],
    permissions: ['contextMenus'],
    version_name: version
  }
})
