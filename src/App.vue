<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.shadow-light {
  box-shadow: 0 2px 6px #e6ecf1;
}
.container {
  max-width: 1140px;
  //display: flex;
  align-items: center;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.link-line {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.bdas-right {
  padding-left: 0;
  margin-bottom: 0;
  margin-left: auto !important;
}
.bnt {
  cursor: pointer;
  font-size: 12px;
  line-height: 24px;
  padding: 0.3rem 0.8rem;
  letter-spacing: 0.5px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
