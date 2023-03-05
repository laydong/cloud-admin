<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="API名称">
							<el-input v-model="state.ruleForm.name" placeholder="请输入API名称" clearable></el-input>
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="请求方式">
              <el-select v-model="state.ruleForm.method" clearable placeholder="选择请求方式">
                <el-option
                    v-for="item in state.methodType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="API路由">
              <el-input v-model="state.ruleForm.url" placeholder="请输入API路由" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="API类型">
              <el-select v-model="state.ruleForm.hidden" clearable placeholder="选择类型">
                <el-option
                    v-for="item in state.hiddenType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="鉴权类型">
              <el-select v-model="state.ruleForm.type" clearable placeholder="选择鉴权类型">
                <el-option
                    v-for="item in state.typeType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态">
							<el-switch v-model="state.ruleForm.status" :active-value="1" :inactive-value="2" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="描述">
							<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入描述" maxlength="150"></el-input>
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

<script setup lang="ts" name="systemApiDialog">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {useApiData} from "/@/api/api";
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	ruleForm: {
    id :0,
    name: '',
    hidden:1,
    type:1,
    url:'',
    method:'',
    describe: '',
    sort: 99,
    status: 1,
    service_id:0,
    createTime: '',
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
  methodType:[{value:'get',label:'GET'},{value:'post',label:'POST'},{value:'put',label:'PUT'},{value:'delete',label:'DELETE'},{value:'patch',label: 'PATCH'}] as methodType[],
  hiddenType:[{value:1,label:'公共路由'},{value:2,label:'鉴权路由'}],
  typeType:[{value:1,label:'登录鉴权'},{value:2,label:'角色鉴权'}],
});

declare type methodType = {
  value: string;
  label: string;
};

// 打开弹窗
const openDialog = (type: string, row: RowApiType) => {
  state.dialog.type = type
	if (type === 'edit') {
    state.ruleForm = row
    state.dialog.title = '修改角色';
    state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
    state.ruleForm.id = 0
    state.ruleForm.name = ''
    state.ruleForm.hidden = 1
    state.ruleForm.type = 1
    state.ruleForm.url =''
    state.ruleForm.method =''
    state.ruleForm.service_id =0
    state.ruleForm.status = 1
    state.ruleForm.describe = ''
    state.ruleForm.sort = 99
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	roleDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
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
	if (state.dialog.type === 'add') {
    useApiData().CreateApi(state.ruleForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }else {
    useApiData().UpdateApi(state.ruleForm).then((res:any)=>{
      if ( res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
      }
    })
  }
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
