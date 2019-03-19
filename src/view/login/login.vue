<template>
	<div class="login-wrap">
		<!-- <header class="header">
			<img src="../../assets/zj-logo.png" alt="">
		</header> -->
		<div class="ms-login" @keyup.enter="submitForm">
			<div class="login-title"></div>
			<div class="input-box user-box">
				<div class="ipt-label pull-left t-center">账号</div>
				<input type="text" v-model="loginData.username">
			</div>
			<div class="input-box pass-box">
				<div class="ipt-label pull-left t-center">密码</div>
				<input type="password" v-model="loginData.password">
			</div>
			<!-- <div class="input-box verify-box">
				<div class="ipt-label pull-left t-center">验证</div>
				<input type="text" v-model="loginData.imageCode">
				<div class="ver-code" @click="getImg">
					<img :src="imgUrl" alt="">
				</div>
			</div> -->
			<div class="input-box btn-box t-center">
				<el-button @click="submitForm" :disabled="disabledState">登录</el-button>
			</div>
			<p class="msg t-center">{{msg}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'login',
		data () {
			return {
				disabledState: true,
				loginData: {
					username: '',
					password: ''
				},
				msg: '',
				imgUrl: ''
			}
		},
		methods: {
			submitForm () {
				this.$axios.post('/login', this.loginData).then((res) => {
					var data = res
					if (data && data.code === 0) {
						this.$cookie.set('isLogin', true)
						this.$router.push({path: '/'})
					} else {
						this.msg = '账号或密码有误'
					}
				})
			}
		},
		watch: {
			loginData: {
				handler (val) {
					if (val.username && val.password) {
						this.disabledState = false
					} else {
						this.disabledState = true
						this.msg = ''
					}
				},
				deep: true
			}
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .login-wrap {
        position: relative;
        width:100vw;
		height:100vh;
		background-color: #c8cef7;
		background-image: url(../../assets/bj.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
    }
    .ms-login {
        position: absolute;
        left:50%;
        top:100px;
        width:400px;
        height:290px;
        margin:0 0 0 -200px;
        border-radius: 5px;
        background-color: #fff;
		background-repeat: no-repeat;
		background-position: center;
	}
	.login-title {
		width:400px;
		height:60px;
		background: #675d54;
		border-radius:5px 5px 0px 0px;
		font-size:24px;
		font-family:PingFang-SC-Bold;
		color:rgba(255,255,255,1);
		line-height:60px;
		text-align: center;
	}
	.input-box {
		width: 280px;
		height: 44px;
		box-sizing: border-box;
		border: 1px solid #b9b9b9;
		border-radius: 4px;
		margin: 0 auto;
		.ipt-label {
			width: 76px;
			height: 100%;
			font-size: 16px;
			color: #6d6d6d;
			line-height: 44px;
			box-sizing: border-box;
			border-right: 1px solid #b9b9b9;
		}
		input {
			border: none;
			border-radius: 4px;
			outline: none;
			width: 202px;
			height: 100%;
			text-indent: 14px;
			color: #3E3E3E;
			font-size: 16px;
		}
	}
	.verify-box {
		position: relative;
		.ver-code {
			position: absolute;
			top: -1px;
			right: -1px;
			width: 70px;
			height: 44px;
			background-color: #EEEEEE;
			border-radius:0px 4px 4px 0px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.user-box {
		margin-top: 26px;
	}
	.pass-box, .verify-box, .btn-box {
		margin-top: 12px;
	}
	.btn-box {
		border: none;
		button {
			width: 100%;
			height: 100%;
			border: none;
			background-color: #675d54;
			color: #fff;
			font-size: 18px;
		}
		box-shadow: 0 1px 8px #675d54;
		button[disabled] {
			color: #dadada;
			background-color: #8a847f;
		}
	}
	.msg {
		color: #D45E63;
		font-size: 12px;
		padding-top: 8px;
	}
</style>