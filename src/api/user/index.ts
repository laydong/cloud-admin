import request from '/@/utils/request';
export function useUserApi() {
	return {
		getAdminList: (params?: object) => {
			return request({
				url: '/admin/list',
				method: 'get',
				params,
			});
		},
		UserInfo: () => {
			return request({
				url: '/admin/info',
				method: 'get',
			});
		},
		getUser: (params?:object) => {
			return request({
				url: '/admin/user',
				method: 'get',
				params
			});
		},
		UserStatus: (data?: object) => {
			return request({
				url: '/admin/status',
				method: 'post',
				data:data,
			});
		},
		UserUpdate: (data?: object) => {
			return request({
				url: '/admin/user_up',
				method: 'post',
				data:data,
			});
		},
		UserCreate: (data?: object) => {
			return request({
				url: '/admin/create',
				method: 'post',
				data:data,
			});
		},
	};
}
