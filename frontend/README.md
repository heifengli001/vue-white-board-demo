# 基于websocket连接的在线同步绘画面板

项目使用konva.js构建画板应用

技术栈-框架：`Vue3` + `Vite` + `ElementUI-Plus` + `KonvaJS`（绘图） 

other: whistle(mock-http) + ws (nodejs的简单websocket服务)

开源组件及一些其他参考案例：

+ [几个2D图形库的比较 ——fabric \ konva \ leaflet \ pixi](https://juejin.cn/post/7243725952789217317)
+ [使用fabric从零开始打造互动白板](
https://juejin.cn/post/7221348552513077305)
+ [LogicFlow](
https://site.logic-flow.cn/tutorial)开源流程图绘图

## 传送门
[konvaJS](https://konvajs.org/)

## 启动
`npm run dev`

## 文件结构
```
--|App.vue
==============================
--|assets 			#静态资源文件夹
--|assets/images 	#图片
--|assets/icons 	#图标
==============================
--|css 				# 统一的css目录
--|css/main.css
--|css/base.css
==============================
--|router 			#路由
==============================
--|utils 			# 工具类
--|utils/cache 		# 缓存帮助
--|utils/user.js 	# 随机生成用户id和昵称
--|utils/catchError # 统一错误处理
--|utils/request 	#请求类 - 封装了 http和websocket
==============================
--|components 			# 组件
--|components/LogicFlow # 流程图
--|components/Konva 	# 画板
--|components/Header 	# 统一头部
==============================
--|api 				# api统一存放目录，不同模块用不同文件
==============================
--|data 			# 数据存放，如统一的配置文件等
==============================
--|views 				# 页面 
--|views/home.vue 		# 主页
--|views/panel.vue 		# 流程图
--|views/board.vue 		#画板
--|views/notFound.vue 	#404

```