<template>
    <div class="background-radom-img" ref="img-background">
       <div class="pre-load-img" ref="pre-load-img"></div>
       
       <Form ref="form" class="login" @submit="login" :model="user" :rules="rules">
          
           <row :gutter="20">
               <i-col :sm="24">
                   <FormItem label="E-mail" prop="email">
                       <i-input v-model="user.email" type="email" @on-enter="login"></i-input>
                   </FormItem>
               </i-col>
           </row>
           <row :gutter="20">
               <i-col :sm="24">
                   <FormItem label="Senha" prop="password">
                       <i-input v-model="user.password" type="password" @on-enter="login"></i-input>
                   </FormItem>
               </i-col>
           </row>
           <row :gutter="20">
               <i-col :sm="24">
                   <Button long type="success" @click="login">Login</Button>
               </i-col>
           </row>
           <br>
           <p>
                Desenvolvido por 
                <a href="https://linkedin.com.br/in/danieloliveirasouza" target="_blank" >
                    Daniel Souza <Icon type="logo-linkedin" />
                </a>
            </p>
       </Form>
    </div>
</template>

<script>
import {msgs, getMSG} from '../lib/helpers/msg';
export default {
    data(){
        return {
            user: {},
            rules: {
                email: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Email'), trigger: 'blur'}],
                password: [{required: true, message: getMSG(msgs.CAMPO_INVALIDO, 'Senha'), trigger: 'blur'}]
            },
        }
    },
    methods:{
        login(){
            this.$refs['form'].validate(valid =>{
                if(valid){
                    this.$auth.login({
                        params: this.user,
                        success(){
                            
                        },
                        error(){
                            this.$Notice.error({
                                title: 'Senha ou Usuário inválidas',
                                desc: 'Tente novamente'
                            });
                        },
                        rememberMe: false,
                        redirect: '/'
                    })
                }
            })
            
        }
    },
    async mounted(){
        let urlIMG = `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight}/?gravity=south})`;
        this.$refs['img-background'].style = `background-image: ${urlIMG}`;
        const loop = true;
        this.$nextTick(()=>{
            window.addEventListener('resize', ()=>{
                urlIMG = `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight}/?gravity=south})`;
                this.$refs['img-background'].style = `background-image: ${urlIMG}`;
            });
        });
        while(loop){
            await new Promise(r=>setTimeout(r, 5000))
            urlIMG = `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight}/?gravity=south&${new Date().getTime()})`;
            this.$refs['pre-load-img'].style = `background-image: ${urlIMG}`;
            await new Promise(r=>setTimeout(r, 5000))
            this.$refs['img-background'].style = `background-image: ${urlIMG}`;
        }
    }
}
</script>

<style scoped>
.background-radom-img{
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat : no-repeat;
    background-size: 100% auto;
    background-position: center;
    transition: background 2s linear;
    padding-top: 80px
}
.pre-load-img{
    width: 0;
    height: 0;
}
.login {
    padding: 10px;
    background-color: #FFF;
    max-width: 450px;
    border-radius: 5px;
    margin: auto;
    margin-top: 20px;
}
.login .title-project{
    font-size: 400%;
    text-align: center;
}
</style>