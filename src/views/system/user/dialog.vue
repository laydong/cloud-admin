<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户名称">
							<el-input v-model="state.ruleForm.username" placeholder="请输入账户名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户昵称">
							<el-input v-model="state.ruleForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="关联角色">
              <el-select v-model="state.ruleForm.role_ids" multiple placeholder="选择用户角色" style="width: 240px">
                <el-option v-for="item in state.roleData" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item label="头像">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="state.ruleForm.avatar" :src="state.ruleForm.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.mobile" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="state.ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" value=1></el-option>
								<el-option label="女" value=2></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户密码">
							<el-input v-model="state.ruleForm.password" placeholder="请输入" type="password" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
							<el-switch v-model="state.ruleForm.status" :active-value="1" :inactive-value="2"  inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户描述">
							<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
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

<script setup lang="ts" name="systemUserDialog">
import { reactive, ref } from 'vue';
import {useRole} from "/@/api/role";
import {useUserApi} from "/@/api/user";
import {ElMessage} from "element-plus";

import type { UploadProps } from 'element-plus'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
    id:0,
    username: '', //账号
    nickname: '',//昵称
    password:'',//密码
    avatar: '', //头像
    email: '',
    mobile: '',
    sex: 1,
    score: '',
    status: 1,
    role_ids:[],
    role_info:[],
    role:'',
    describe: '',
	},
  roleData:[],
	deptData: [] as DeptTreeType[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowUserType) => {
  state.dialog.type = type
	if (type === 'edit') {
    useUserApi().getUser({"id":row.id}).then((res:any)=>{
      if ( res.code == 200 ) {
        state.ruleForm = res.data
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
    // state.ruleForm.nickname = row.nickname;
    // state.ruleForm.username = row.username;
    // state.ruleForm.avatar = row.avatar;
    // state.ruleForm.email = row.email;
    // state.ruleForm.mobile = row.mobile;
    // state.ruleForm.sex = row.sex;
    // state.ruleForm.status = row.status;
    // state.ruleForm.roleIds = row.roleIds;
    // state.ruleForm.role_info = row.role_info;
    // state.ruleForm.remarks = row.remarks;
		state.dialog.title = '修改用户';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	userDialogFormRef.value.resetFields();
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
	if (state.dialog.type === 'add') {
    emit('refresh');
  }else {
    useUserApi().UserUpdate(state.ruleForm).then((res:any)=>{
      if (res.code == 200 ) {
        ElMessage.success(res.msg);
        emit('refresh');
      }else {
        ElMessage.error(res.msg);
        return
      }
    })
  }
};
// 初始化部门数据
const getMenuData = () => {
  useRole().getRoleAll().then((res:any)=>{
    if (res.code == 200 ) {
      state.roleData = res.data
    }
  })
	state.deptData.push({
		deptName: 'vueNextAdmin',
		createTime: new Date().toLocaleString(),
		status: true,
		sort: Math.random(),
		describe: '顶级部门',
		id: Math.random(),
		children: [
			{
				deptName: 'IT外包服务',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '总部',
				id: Math.random(),
			},
			{
				deptName: '资本控股',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '分部',
				id: Math.random(),
			},
		],
	});
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  state.ruleForm.avatar = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 暴露变量
defineExpose({
	openDialog,
});
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>