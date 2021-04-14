import axios from "axios";

//登录
const postLogin = (form) =>
  axios.post("/api/v1/login", form).then((res) => res.data);
//注册
const postRegister = (form) =>
  axios.post("/api/v1/user/register", form).then((res) => res.data);
//获取个人信息
const getUserMe = () => axios.get("/api/v1/user/me").then((res) => res.data);
// 获取用户类型
const getMe = () => axios.get(`/api/v1/me`).then((res) => res.data);
// 普通用户进行身份认证
const userIdentityAuth = (form) =>
  axios.post("/api/v1/user/identity/auth", form).then((res) => res.data);
// 普通用户退出登陆
const userExit = () =>
  axios.delete("/api/v1/user/logout").then((res) => res.data);
// 普通用户查询证书
const userCertification = () =>
  axios.get("/api/v1/user/certification/list").then((res) => res.data);

//获取学校个人信息
const getUniversityMe = () =>
  axios.get("/api/v1/university/me").then((res) => res.data);
// 学校用户退出登陆
const universityExit = () =>
  axios.delete("/api/v1/university/logout").then((res) => res.data);
// 学校注册
const universityRegister = (form) =>
  axios.post("/api/v1/university/register", form).then((res) => res.data);
// 学校发送认证请求
const universityCertificate = (form) =>
  axios.post("/api/v1/university/studentAuth", form).then((res) => res.data);
// 学校用户获取以认证的信息
const universityCertificateList = (form) =>
  axios
    .get("/api/v1/university/studentAuth/list", { params: form })
    .then((res) => res.data);
// 学校用户获取以认证的信息的详细信息
const universityCertificateMsg = (form) =>
  axios
    .get("/api/v1/university/studentAuth/list/msg", { params: form })
    .then((res) => res.data);

//获取管理员个人信息
const getAdminMe = () => axios.get("/api/v1/admin/me").then((res) => res.data);
// 管理员用户退出登陆
const AdminExit = () =>
  axios.delete("/api/v1/admin/logout").then((res) => res.data);
// 获取用户
const userInfo = (form) =>
  axios.get("/api/v1/admin/userInfo", { params: form }).then((res) => res.data);
//更新普通用户信息
const modifyUser = (form) =>
  axios.put("/api/v1/admin/modify/user", form).then((res) => res.data);
//更新普通用户信息
const modifyUniversity = (form) =>
  axios.put("/api/v1/admin/modify/university", form).then((res) => res.data);
//获取待审核消息
const msgList = (form) =>
  axios.get("/api/v1/admin/msg/list", { params: form }).then((res) => res.data);
//获取待审核消息
const anthUser = (form) =>
  axios.put("/api/v1/admin/authenticated/user", form).then((res) => res.data);
// 发送消息
const inboxSend = (form) =>
  axios.post("/api/v1/admin/inbox/send", form).then((res) => res.data);
// 审核学历证书信息
const acCertification = (form) =>
  axios
    .put("/api/v1/admin/academic/certification", form)
    .then((res) => res.data);
// 获取下一条待审核消息
const nextMsg = (form) =>
  axios.get("/api/v1/admin/msg", { params: form }).then((res) => res.data);

// 获取消息inbox
const inboxList = (form) =>
  axios.get("/api/v1/inbox/list", { params: form }).then((res) => res.data);
// 查看消息
const inboxLook = (form) =>
  axios.get("/api/v1/inbox/looked", { params: form }).then((res) => res.data);
// 获取未读消息数量
const inboxUnread = (form) =>
  axios
    .get("/api/v1/inbox/list/unread", { params: form })
    .then((res) => res.data);

//更新用户信息
const putRevise = (form) =>
  axios.put("/api/v1/user/account", form).then((res) => res.data);

// 读用户详情
const getUser = (id) =>
  axios.get(`/api/v1/users/${id}`).then((res) => res.data);

export {
  postLogin,
  postRegister,
  getMe,
  userExit,
  putRevise,
  getUser,
  getUserMe,
  userIdentityAuth,
  getUniversityMe,
  universityExit,
  getAdminMe,
  AdminExit,
  universityRegister,
  userInfo,
  modifyUser,
  modifyUniversity,
  inboxList,
  inboxLook,
  inboxUnread,
  inboxSend,
  msgList,
  anthUser,
  universityCertificate,
  universityCertificateList,
  universityCertificateMsg,
  acCertification,
  nextMsg,
  userCertification,
};
