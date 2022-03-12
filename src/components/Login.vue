<style scoped>
	p {
	line-height: 1rem;
	}

	.card {
	padding: 20px;
	}

	.form-group input {
		margin-bottom: 20px;
	}

	.login-page {
		align-items: center;
		display: flex;
		height: 100vh;
	}
	.wallpaper-login {
		background: #ebe4fb;
		background-size: cover;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
   
	.wallpaper-register {
		background: #c7a4ff;
		background-size: cover;
		height: 100%;
		position: absolute;
		width: 100%;
		z-index: -1;
	}

	h1 {
		margin-bottom: 1.5rem;
	}

	.error {
	animation-name: errorShake;
	animation-duration: 0.3s;
	}

	@keyframes errorShake {
	0% {
		transform: translateX(-25px);
	}
	25% {
		transform: translateX(25px);
	}
	50% {
		transform: translateX(-25px);
	}
	75% {
		transform: translateX(25px);
	}
	100% {
		transform: translateX(0);
	}
	}
</style>

<template>
	<div class="login-page">
		<transition name="fade">
			<div v-if="!registerActive" class="wallpaper-login"></div>
		</transition>
		<div class="wallpaper-register"></div>

		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
					<div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
						<h1>Sign In</h1>
						<form class="form-group">
							<input v-model="emailLogin" type="email" class="form-control" placeholder="Email">
							<p class="form-text text-muted">{{errorMsg}}</p>
							<input type="submit" value="Log In" class="btn btn-primary" @click.prevent="doLogin">
							<p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
							</p>
						</form>
					</div>

					<div v-else class="card register" v-bind:class="{ error: emptyFields }">
						<h1>Sign Up</h1>
						<form class="form-group">
							<input v-model="emailReg" type="email" class="form-control" placeholder="Email" >
							<p class="form-text text-muted">{{errorMsg}}</p>
							<input type="submit" value="Register" class="btn btn-primary" @click.prevent="doRegister">
							<p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import auth from '@/authentication/auth.js'
	export default {
		name: 'Login',		
		components: {			
		},
		data: function (){
			return {
				registerActive: false,
				emailLogin: "",
				emailReg: "",
				emptyFields: false,
				errorMsg: ""
			}
		},
		validations: {
			
		},
		computed : {
			
		},
		methods : {	
			
			doLogin() {
				if (!this.emailLogin.length) {
					this.emptyFields = true;
					this.errorMsg = ''
				} 
				else {
					let loginUser = auth.loginEmp(this.emailLogin)
					if(loginUser.isDone){
						this.$store.dispatch('login', {eid : this.emailLogin})
						this.$router.push('/')
					}
					else{
						this.errorMsg = loginUser.errorMessage
					}
				}
			},
			
			doRegister() {
				if (!this.emailReg.length) {
					this.emptyFields = true;
				}
				else if(!/\S+@\S+\.\S+/.test(this.emailReg)){
					this.errorMsg = 'invalid email'
				}
				else {
					let registerUser = auth.registerEmp(this.emailReg)
					if(registerUser.isDone){
						this.registerActive = false
					}
					{
						this.errorMsg = registerUser.errorMessage
					}
				}
			}
		},
		watch: {
		},
		// called after data() is set, so make api calls on this
		created: function () {
		},
		// called after DOM is ready so do dom manipulations here.
		mounted: function () {
		
		
			
		}
	}		
</script>