import request from '/@/utils/request';


/**
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getMenuList 获取后端动态路由菜单
 * @method syncMenu 同步后端动态路由菜单
 */
export function useMenuApi() {
	return {
		getMenuList: (params?: object) => {
			return request({
				url: '/menu/list',
				method: 'get',
				params,
			});
		},
		syncMenu: (params?: object) => {
			return request({
				url: '/import_menu',
				method: 'post',
				data:params,
			});
		},
		getMenuAll: () => {
			return request({
				url: '/menu/all',
				method: 'get',
			});
		},
		createMenu: (params?: object) => {
			return request({
				url: '/menu/create',
				method: 'post',
				data:params,
			});
		},
		updateMenu: (params?: object) => {
			return request({
				url: '/menu/update',
				method: 'post',
				params,
			});
		},
	};
}
