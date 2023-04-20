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
			mobile:'',
			status:1,
			login_time:'',
			login_ip:'',
			time: 0,
			role:'',
			describe:'',
			email:'',
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
		},
		// 模拟接口数据
		// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					useUserApi().UserInfo().then((res: any)=>{
						if (res.code == 200 ) {
							this.userInfos.id = res.data.id
							this.userInfos.avatar = res.data.avatar
							this.userInfos.nickname = res.data.nickname
							this.userInfos.username = res.data.username
							this.userInfos.sex = res.data.sex
							this.userInfos.mobile = res.data.mobile
							this.userInfos.status = res.data.status
							this.userInfos.login_ip = res.data.login_ip
							this.userInfos.login_time = res.data.login_time
							this.userInfos.role = res.data.role
							this.userInfos.describe = res.data.describe
							this.userInfos.email = res.data.email
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
