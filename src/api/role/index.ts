import request from '/@/utils/request';


/**
 * 角色管理
 * @method getRoleList 获取角色列表
 * @method UpdateRole 更新角色信息
 */
export function useRole() {
	return {
		getRoleList: (params?: object) => {
			return request({
				url: '/role/list',
				method: 'get',
				params,
			});
		},
		getRoleInfo: (params?: object) => {
			return request({
				url: '/role/info',
				method: 'get',
				params,
			});
		},
		getRoleAll: () => {
			return request({
				url: '/role/all',
				method: 'get',
			});
		},
		UpdateRole: (params?: object) => {
			return request({
				url: '/role/update',
				method: 'post',
				data:params,
			});
		},
		CreateRole: (params?: object) => {
			return request({
				url: '/role/create',
				method: 'post',
				data:params,
			});
		},
		DelRole: (params?: object) => {
			return request({
				url: '/role/del',
				method: 'post',
				data:params,
			});
		},
	};
}
