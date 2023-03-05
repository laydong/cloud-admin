<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称">
							<el-input v-model="state.ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色标识">
							<template #label>
								<el-tooltip effect="dark" content="用于 `router/route.ts` meta.roles" placement="top-start">
									<span>角色标识</span>
								</el-tooltip>
							</template>
							<el-input v-model="state.ruleForm.group_id" placeholder="请输入角色标识" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色状态">
							<el-switch v-model="state.ruleForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述">
							<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入角色描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限">
							<el-tree  ref="treeRef" :data="state.menuData" :props="state.menuProps"  :default-checked-keys="state.ruleForm.menu_ids" node-key="id" highlight-current show-checkbox class="menu-data-tree" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { reactive, ref } from 'vue';
import { ElMessage,ElTree } from 'element-plus';
import {useMenuApi} from "/@/api/menu";
import {useRole} from "/@/api/role";
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

export declare type TreeKey = string | number;
// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	ruleForm: {
    id :0,
    name: '',
    describe: '',
    group_id:0,
    sort: 99,
    status: 1,
    menu_ids:[] as TreeKey[],
	},
	menuData: [] as TreeType[],
	menuProps: {
		children: 'children',
		label: 'label',
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const treeRef = ref<InstanceType<typeof ElTree>>()

// 打开弹窗
const openDialog = (type: string, row: RowRoleType) => {
  state.dialog.type = type
	if (type === 'edit') {
    state.ruleForm.id = row.id
    // state.ruleForm.name = row.name
    // state.ruleForm.group_id = row.group_id
    // state.ruleForm.status = row.status
    // state.ruleForm.describe = row.describe
    // state.ruleForm.sort = row.sort
    // state.ruleForm.menu_ids = []
		state.dialog.title = '修改角色';
		state.dialog.submitTxt = '修 改';
    useRole().getRoleInfo({"id":state.ruleForm.id}).then((res:any)=>{
      if ( res.code == 200 ) {
        state.ruleForm = res.data
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
	} else {
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
    state.ruleForm.id = 0
    state.ruleForm.name = ''
    state.ruleForm.group_id = 0
    state.ruleForm.status = 1
    state.ruleForm.describe = ''
    state.ruleForm.sort = 99
    state.ruleForm.menu_ids = []
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	roleDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
  state.ruleForm.menu_ids =treeRef.value!.getCheckedKeys(false)
	if (state.dialog.type === 'add') {
    useRole().CreateRole(state.ruleForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }else {
    useRole().UpdateRole(state.ruleForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }
};
// 获取菜单结构数据
const getMenuData = () => {
  useMenuApi().getMenuAll().then((res:any)=>{
    if ( res.code == 200 ) {
      state.menuData = res.data
    }
  })
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
