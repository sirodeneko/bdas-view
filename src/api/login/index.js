import axios from 'axios';

//登录
const postLogin = form => axios.post('/api/v1/login', form).then(res => res.data);
//注册
const postRegister = form => axios.post('/api/v1/user/register', form).then(res => res.data);
//获取个人信息
const getUserMe = () => axios.get('/api/v1/user/me').then(res => res.data);
// 获取用户类型
const getMe = () => axios.get(`/api/v1/me`).then(res => res.data);
// 普通用户进行身份认证
const userIdentityAuth = form => axios.post('/api/v1/user/identity/auth', form).then(res => res.data);
// 普通用户退出登陆
const userExit = () => axios.delete('/api/v1/user/logout').then(res => res.data);

//获取学校个人信息
const getUniversityMe = () => axios.get('/api/v1/university/me').then(res => res.data);
// 学校用户退出登陆
const UniversityExit = () => axios.delete('/api/v1/university/logout').then(res => res.data);

//更新用户信息
const putRevise = form => axios.put('/api/v1/user/account', form).then(res => res.data);

// 读用户详情
const getUser = id => axios.get(`/api/v1/users/${id}`).then(res => res.data);



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
  UniversityExit,
};