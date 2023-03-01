import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import {useUserApi} from "/@/api/user";

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			id:0,
			username:'',
			nickname:'',
			avatar:'',
			sex:1,
			status:1,
			login_time:'',
			login_ip:'',
			time: 0,
			menu_info:[],
			role_info: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {

				await this.getApiUserInfo();
			}
			if (this.userInfos.id == 0) {
				await this.getApiUserInfo();
			}
			// 	const userInfos: any = await this.getApiUserInfo();
			// 	this.userInfos = userInfos;
			// }
		},
		// 模拟接口数据
		// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					// // 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
					// const userName = Cookies.get('userName');
					// // 模拟数据
					// let defaultRoles: Array<string> = [];
					// let defaultAuthBtnList: Array<string> = [];
					// // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					// let adminRoles: Array<string> = ['admin'];
					// // admin 按钮权限标识
					// let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					// // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					// let testRoles: Array<string> = ['common'];
					// // test 按钮权限标识
					// let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
					// // 不同用户模拟不同的用户权限
					// if (userName === 'admin') {
					// 	defaultRoles = adminRoles;
					// 	defaultAuthBtnList = adminAuthBtnList;
					// } else {
					// 	defaultRoles = testRoles;
					// 	defaultAuthBtnList = testAuthBtnList;
					// }
					// // 用户信息模拟数据
					// const userInfos = {
					// 	userName: userName,
					// 	photo:
					// 		userName === 'admin'
					// 			? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
					// 			: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					// 	time: new Date().getTime(),
					// 	roles: defaultRoles,
					// 	authBtnList: defaultAuthBtnList,
					// };
					useUserApi().UserInfo().then((res: any)=>{
						if (res.code == 200 ) {
							this.userInfos.id = res.data.id
							this.userInfos.avatar = res.data.avatar
							this.userInfos.nickname = res.data.nickname
							this.userInfos.username = res.data.username
							this.userInfos.sex = res.data.sex
							this.userInfos.status = res.data.status
							this.userInfos.login_ip = res.data.login_ip
							this.userInfos.login_time = res.data.login_time
							this.userInfos.menu_info = res.data.menu_info
							this.userInfos.role_info = res.data.role_info
						}
					})
					// admin 按钮权限标识
					let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					this.userInfos.time = new Date().getTime()
					this.userInfos.authBtnList = adminAuthBtnList
					Session.set('userInfo',this.userInfos)
					resolve(this.userInfos);
				}, 0);
			});
		},
	},
});
