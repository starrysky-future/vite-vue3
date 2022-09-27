<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="ruleForm.username" autocomplete="on" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef, 'login')">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef, 'register')">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { getLogin, getRegister } from "@/apis/userApi";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined, type: string) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      if (type === "login") {
        const res = await getLogin(ruleForm);
        const userStore = useUserStore();
        // @ts-ignore
        userStore.token = res.result.token;
        if (userStore.lastVisitRoute) {
          router.push({ path: userStore.lastVisitRoute }).then(() => {
            userStore.lastVisitRoute = "";
          });
        } else {
          router.push({ path: "/" });
        }
      } else {
        const res = await getRegister(ruleForm);
        console.log("res", res);
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.login {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: url("@/images/home.webp") no-repeat;
  background-size: cover;
  /deep/.el-form-item__label {
    color: white;
  }
}
</style>
