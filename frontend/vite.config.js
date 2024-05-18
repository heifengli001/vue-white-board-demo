import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// 引入 Element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 引入 Icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// 引入 svg处理
import svgLoader from 'vite-svg-loader'
import Inspect from 'vite-plugin-inspect'
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    svgLoader(),
    // ...
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    },
  ),
    Components({
      resolvers: [
         // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),

        ElementPlusResolver(),
        
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),


    Inspect(),
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    }
  }
})
