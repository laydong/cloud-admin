import request from '/@/utils/request';


/**
 * API管理
 * @method getRoleList 获取角色列表
 * @method UpdateRole 更新角色信息
 */
export function useApiData() {
	return {
		getApiList: (params?: object) => {
			return request({
				url: '/api/list',
				method: 'get',
				params,
			});
		},
		getApiInfo: (params?: object) => {
			return request({
				url: '/api/info',
				method: 'get',
				params,
			});
		},
		getApiAll: () => {
			return request({
				url: '/api/all',
				method: 'get',
			});
		},
		UpdateApi: (params?: object) => {
			return request({
				url: '/api/update',
				method: 'post',
				data:params,
			});
		},
		CreateApi: (params?: object) => {
			return request({
				url: '/api/create',
				method: 'post',
				data:params,
			});
		},
		DelApi: (params?: object) => {
			return request({
				url: '/api/del',
				method: 'post',
				data:params,
			});
		},
	};
}
