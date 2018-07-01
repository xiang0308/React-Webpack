# 说明

### 1. 项目安装环境	

​	建议安装`node7.0.0`以下版本[https://nodejs.org/en/blog/release/v6.2.0/](https://nodejs.org/en/blog/release/v6.2.0/)

### 2. 项目结构概览及说明

```tree
.
├─.babelrc                              // babel的配置
├─.editorconfig                         // 编辑器配置
├─.eslintrc.json                        // eslint的配置文件
├─.gitignore                            // git忽略上传的文件
├─package.json                        	// npm依赖包
├─readme.md                          	// 项目介绍
├─server.js				    			// 启动本地服务及端口号
├─gulpfile.js				    		// 将本地项目文件通过sftp打包到远程服务器
├─webpack.config.js		    			// webpack配置文件
├─cfg                         		    // webpack打包环境配置文件
|  ├─base.js							// webpack基础配置文件
|  ├─default.js							// webpack默认（less、图片、js等文件编译打包）配置文件
|  ├─dev.js								// webpack开发环境配置文件
|  ├─qa.js								// webpack测试环境配置文件
|  ├─rd.js								// 打包到联调、测试环境配置文件
|  ├─dist.js							// 打包到线上环境配置文件
├─src                                 	// 页面主文件
|  ├─favicon.png						// 收藏夹图标
|  ├─index.js							// 入口js文件，页面路由配置，公共样式，相关依赖库等注入
|  ├─index.html             		  	// 入口html文件
|  ├─config                            	// 状态机actions
|      ├─base.js                        // 后台api接口域名、h5微信分享授权地址等基础配置文件
|      ├─dev.js                         // webpack开发环境配置文件
|      ├─test.js                        // webpack测试环境配置文件
|      ├─dist.js                        // webpack线上环境配置文件
|  ├─constants                          // 状态机常量文件夹
|  |   ├─alert.js                      	// 如：定义提示窗常量
|  |   └index.js                      	// 统一在index文件中合并导出定义的相关constants文件
|  ├─actions                            // 状态机action文件夹
|  |   ├─alert.js                       // 如：定义提示窗action
|  |   └index.js                        // 统一在index文件中合并导出定义的相关actions文件
|  ├─reducers                           // 状态机reducer文件夹
|  |   ├─alert.js                       // 如：定义提示窗reducer用来处理state
|  |   └index.js                        // 统一在index文件中合并导出定义的相关reducers文件
|  ├─containers                         // 全局的框架文件，存放基于页面级组件
|  |     ├─m							// 移动端入口文件夹
|  |     |  ├─index.js					// 公共弹窗组件、静态资源预加载等等操作都可以在该文件中注入
|  |     |  ├─index.less				// 定义样式
|  |     |  |  ├─home                   // 如：定义首页页面组件
|  |     |  |  |  ├─index.js            
|  |     |  |  |  ├─index.less          
|  |     |  |  ├─rank                   // 如：定义排行榜页面组件
|  |     |  |  |  ├─index.js            
|  |     |  |  |  ├─index.less          
|  ├─business                           // 存放基于业务级组件
|  |     ├─RankList						// 如：定义排行榜列表组件
|  |     |  ├─index.js					
|  |     |  ├─index.less
|  ├─public                           	// 存放通用组件
|  |     ├─Alter						// 如：定义提示窗组件
|  |     |  ├─index.js					
|  |     |  ├─index.less
|  ├─services                           // 公共服务
|  |   ├─service.js                      // 定义后台接口
|  |   ├─utils.js                      	// 工具类
|  |   ├─wx-config.js                   // JS-SDK应用程序签名信息文件
|  |   ├─wx-share.js                    // JS-SDK分享接口文件
|  |   ├─wx-voice.js                    // JS-SDK音频接口
|  |   ├─wx-scan.js                     // JS-SDK微信扫一扫接口
|  |   ├─wx.js                     		// JS-SDK库文件
|  |   └index.js                        // 统一在index文件中合并导出定义的相关services文件
|  ├─styles                            	// 存放公共样式
|  |   ├─common.less                    // 全局通用样式
|  |   ├─animate.less                   // 全局动画样式
|  ├─images                          	// 图片文件夹
```
### 3. 项目运行

##### 安装依赖包

`npm install` or `cnpm install`

##### 本地开发环境启动

`npm start`

##### 联调、测试环境代码打包

`npm run rd`

##### 线上环境代码打包

`npm run dist`

### 4. 项目部署

（1）登录到服务器，ftp的连接方式如下：

​	IP：************（拨号VPN后才能连上）

​	端口号：xxx

​	用户名：ftp

​	密码：**************

（2）登录成功后，在服务器上创建活动项目目录名称或版本号

（3）将本地打包生成好的 rd （联调、测试环境文件包） 和 dist （线上环境文件包）上传到第2步骤创建活动项目目录下

（4）浏览，`如: https://xiang0308.github.io/react-webpack/dist/#/m/effect`

### 5. 其他

| 公共组件            | 描述               |
| --------------- | ---------------- |
| Alert           | 提示框组件            |
| Confirm         | 确认框组件            |
| CssAlign        | 水平对齐组件           |
| CssFadeEffect   | 动效组件             |
| CssFlex         | 弹性布局组件           |
| CssLayout       | 水平垂直居中组件         |
| CssRotateEffect | 旋转动画组件           |
| CssShakeEffect  | 摇动动画组件           |
| CssZoomEffect   | 放大缩小动画组件         |
| FormControl     | 表单控制组件           |
| ListView        | 列表上拉下滑加载组件       |
| Mask            | 遮罩组件             |
| Mobile          | 基于手机端顶层ui组件      |
| Modal           | 弹层组件             |
| Music           | 音乐播放组件           |
| Orientation     | 手机竖屏切换横屏增强用户体验组件 |
| Preloader       | 加载等待组件           |
| Shake           | 手机摇一摇组件          |
| TwoWayBind      | 双向绑定操作表单函数库      |