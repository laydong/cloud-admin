<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="system-user-search mb15">
				<el-input v-model="state.tableData.param.name" size="default" placeholder="请输入角色名称" style="max-width: 200px"> </el-input>
        <el-select v-model="state.tableData.param.status" size="default" class="ml10" placeholder="请选择状态">
          <el-option
              v-for="item in state.tableData.options"
              :key="item.id"
              :label="item.label"
              :value="item.id"
          />
        </el-select>
        <el-button size="default" type="primary" class="ml10" @click="onOpenSearch()">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="group_id" label="角色标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="角色状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch :disabled="scope.row.id === 1" v-model="scope.row.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁" @click="OpenStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
				<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onOpenEditRole('edit', scope.row)"
							>修改</el-button
						>
						<el-button :disabled="scope.row.id === 1" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.page"
				background
				v-model:page-size="state.tableData.param.per_page"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</div>
		<RoleDialog ref="roleDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {useRole} from "/@/api/role";
// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'));

// 定义变量内容
const roleDialogRef = ref();

const state = reactive<SysRoleState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			name: '',
      status:0,
      page: 1,
      per_page: 10,
		},
    options:[{'id':0,'label':"全部"},{'id':1,'label':"启用"},{'id':2,'label':"禁用"}]
	},
});
// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
  useRole().getRoleList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = state.tableData.data.length;
    }
  })
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增角色弹窗

//搜索
const onOpenSearch = ()=>{
  state.tableData.loading = true;
  useRole().getRoleList(state.tableData.param).then((res:any)=>{
    if (res.code == 200 ) {
      state.tableData.data =  res.data.data;
      state.tableData.total = state.tableData.data.length;
    }
  })
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
}

const onOpenAddRole = (type: string) => {
	roleDialogRef.value.openDialog(type);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
	roleDialogRef.value.openDialog(type, row);
};
// 删除角色
const onRowDel = (row: RowRoleType) => {
	ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
      useRole().DelRole({'id':row.id}).then((res:any)=>{
        if (res.code == 200 ) {
          getTableData();
          ElMessage.success('删除成功');
        }else {
          ElMessage.error('删除失败');
        }
      })
		})
		.catch(() => {});
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});

const OpenStatus = (row:any) =>{
  useRole().UpdateRole(row).then((res:any)=>{
    if (res.code != 200 ) {
      ElMessage.success('更新失败');
    }
  })
}
</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>
