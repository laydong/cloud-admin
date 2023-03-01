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
		UserInfo: () => {
			return request({
				url: '/user/info',
				method: 'get',
			});
		},
	};
}
