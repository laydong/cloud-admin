import request from '/@/utils/request';
export function useUserApi() {
	return {
		getAdminList: (params?: object) => {
			return request({
				url: '/user/list',
				method: 'get',
				params,
			});
		},
		// getTestMenu: (params?: object) => {
		// 	return request({
		// 		url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/testMenu.json',
		// 		method: 'get',
		// 		params,
		// 	});
		// },
	};
}
