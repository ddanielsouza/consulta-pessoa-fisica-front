<template>
  <div class="home">
    <div class="card-w">
      <row :gutter="20">
        <i-col :sm="12">
          <i-input placeholder="CPF" v-model="registry" @on-enter="searchClient"></i-input>
          <br><br>
          <Button long type="success" @click="searchClient">Consultar</Button>
        </i-col>
        <i-col :sm="4"><br></i-col>
        <i-col :sm="8">
          <i-circle
            :trail-width="4"
            :stroke-width="5"
            :percent="score <= 0 ? 0 : score / 10"
            stroke-linecap="square"
            stroke-color="#43a3fb">
            <div class="demo-Circle-custom">
                <h1>{{score}}</h1>
                <p>Score</p>
            </div>
        </i-circle>
        </i-col>
      </row>
    </div>
    
    <br>

    <div v-if="client" class="card-w">
      <h1>{{(client.name || '').toUpperCase()}}</h1>
      <hr>
      <br>
      Endereços:
      <br> 
      <row :gutter="20">
        <i-col :sm="12" v-for="(item, index) in (client.address || [])" :key="index">
          <div class="card-w">
            <row :gutter="20">
              <i-col :sm="12"><b>CEP:</b> {{item.dctZipCode}}</i-col>
              <i-col :sm="24"><b>BAIRRO:</b> {{item.dctNeighborhood}}</i-col>
              <i-col :sm="24"><b>LOGRADOURO:</b> {{item.dctStreetAddress}}</i-col>
              <i-col :sm="24"><b>COMPLEMENTO:</b> {{item.dctComplement}}</i-col>
            </row>
          </div>
        </i-col>
      </row>
      <br>
      Dividas:
       <Alert :type="debt.isActive ? 'error': 'success'" show-icon v-for="(debt, index) in (client.debts || [])" :key="index">
          <row :gutter="20">
              <i-col :sm="24"><b>DESCRIÇÃO: </b> {{debt.description}}</i-col>
              <i-col :sm="12"><b>VALOR INICIAL: </b> {{parseFloat(debt.initialAmount).toLocaleString('PT-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}}</i-col>
              <i-col :sm="12"><b>INICIO DA DIVIDA: </b> {{moment(debt.startDate).format('DD/MM/YYYY')}}</i-col>
              <i-col :sm="24"><b>DATA PAGAMENTO: </b> {{debt.isActive ? '' : moment(debt.datePayment).format('DD/MM/YYYY')}}</i-col>
              <i-col :sm="12"><b>VALOR FINAL PAGO: </b> {{debt.isActive ? '' : parseFloat(debt.initialAmount).toLocaleString('PT-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}}</i-col>
            </row>
       </Alert>
    </div>
    <br>

  </div>
</template>

<script>
import APIDividas from '../requests/APIDividas'
import APIScore from '../requests/APIScore'
import APILog from '../requests/APIScoreLogs'
import moment from 'moment';

export default {
  name: "home",
  data(){
    return{
      registry: '',
      client: null,
      score: 0,
    }
  },
  watch:{
    registry(newValue, oldValue){
      if(( `${newValue}` !== `${oldValue}` && ! /\d{11}/.test(newValue) ) || newValue.length > 11){
        const registry = newValue.replace(/\D/, '')
        this.registry = new String(registry.substr(0, 11));
      }
    }
  },
  methods:{
    moment,
    async searchClient(){
      if(/\d{11}/.test(this.registry)){
        try{
          this.$Spin.show();
          const clients = await APIDividas.getClients({
            dctRegistry: this.registry,
            relationships: JSON.stringify(['address', 'debts'])
          });

          if((clients || []).length){
            this.client = clients[0];
            APIScore.getScore(this.client.id).then(score => this.score = score);
            APILog.saveLog({
              registry: this.registry,
              description: 'Consulta de score',
              bureau: this.$auth.user().department.bureau
            });
          }
          else{
            this.client = null;
            this.score = 0;
            this.$Notice.warning({
                title: 'Cliente',
                desc: 'Cliente não localizado',
                duration: 8
            });
          }
        }finally{
          this.$Spin.hide();
        }
      }
    }
  }
};
</script>

<style scoped>


.home{
  padding: 50px;
}

.home > .card-w{
  background-color: #FFF;
  padding: 10px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 5px;
}


@media only screen and (max-width: 600px) {
 .home{
    padding: 0!important;
  }
}
</style>
