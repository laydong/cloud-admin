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
		getUser: (params?:object) => {
			return request({
				url: '/user/user',
				method: 'get',
				params
			});
		},
		UserStatus: (data?: object) => {
			return request({
				url: '/user/status',
				method: 'post',
				data:data,
			});
		},
		UserUpdate: (data?: object) => {
			return request({
				url: '/user/user_up',
				method: 'post',
				data:data,
			});
		},
	};
}
