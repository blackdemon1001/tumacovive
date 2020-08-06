new Vue({
    el: '#app',
    data: () => ({
      //USAR MIXIN !!!!!! larguraTela
      larguraTela: 0,
      idInterno: 0,
      modalNovoCompromisso: false,
      modalDiaSemana: false,
      tipoCalendario: 'month',
      modalMes: false,
      modalHora: false,
      modalData: false,
      botaoAdicionarVisivel: true,
      mes: new Date().toISOString().substr(0, 7),
      ano: parseInt(new Date().toISOString().substr(0,4)),    
      dataAtualCalendario: moment().format('YYYY-MM-DD'),
      diaSemana: new Date().toISOString().substr(0,10),
      cores: [
        {value: 'blue', text: 'Azul'},
        {value: 'green', text: 'Verde'},
        {value: 'yellow', text: 'Amarelo'},
        {value: 'orange', text: 'Laranja'},
        {value: 'purple', text: 'Roxo'},
        {value: 'red', text: 'Vermelho'},
        {value: 'black', text: 'Preto'},      
      ],
      novoCompromisso: {
          id: 0,
          titulo: '',
          detalhes: '',
          date: '',
          aberto: false,
          cor: 'blue',
          hour: 0,
          minute: 0,
          time: ''
      },
      hoje: moment().format('YYYY-MM-DD'),
      events: [],
      regrasTitulo:[
        v => !!v || 'Por favor, informe o título do compromisso',
        v => v.length <= 30 || 'O título deve conter no máximo 30 caracteres'
      ],
      regrasData:[
        v => !!v || 'Por favor, informe a data do compromisso'
      ],
      regrasHora:[
        v => !!v || 'Por favor, informe a hora do compromisso'
      ]
    }),
    computed: {
      dataDiaSemanaFormatada(){
        if(this.diaSemana == ''){
          return '';
        }
        return moment(this.diaSemana, 'YYYY-MM-DD').format('DD/MM/YYYY');
      },
      dataCompromissoFormatada(){
        if(this.novoCompromisso.date == ''){
          return '';
        }
        return moment(this.novoCompromisso.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
      },
      textoMesSelecionado(){
        let mesSelecionado = parseInt(this.mes.split('-')[1]);
        let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
        return meses[mesSelecionado - 1] + ' de ' + this.ano
      },
      textoBotaoSalvar(){
        return this.novoCompromisso.id ? 'Editar' : 'Adicionar'
      },
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }    
    },
    methods: {
      estilizarDiasSemana(tipoCalendario){
        if(tipoCalendario == 'week' || tipoCalendario == 'day'){
          setTimeout(() => {
            var elementos = document.querySelectorAll('.v-calendar-daily_head-day-label');
          if(elementos.length > 1){
            elementos.forEach(e => {
              e.classList.add('label-dia-semana');
            });
          }else if(elementos.length == 1){
            elementos[0].classList.remove('label-dia-semana');
          }
          }, 50);
        }
      },
      retornarDataFormatada(data){
        return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
      },
      formatarIntervalo(i){return i.time},
      retornarEventosPorHora(data, hora, minuto){
        return this.events.filter(ev => {
          if(ev.date == data && ev.hour == hora){
            if(minuto == 0 && ev.minute <= 29){
              return true;
            }else if(minuto == 30 && ev.minute >= 30){
              return true;
            }
          }
          return false;
        });
      },
      salvarDiaSemana(e){      
        this.modalDiaSemana = false;
        this.dataAtualCalendario = e;  
        this.$refs.modalDiaSemana.save(e);
        var split = e.split('-');
        this.ano = parseInt(split[0]);
        this.mes = split[0] + '-' + split[1];
      },
      adiantar(){      
        switch(this.tipoCalendario){
            case 'month':
              this.$refs.calendario.next();
              let mesAtual = parseInt(this.mes.split('-')[1]);
              mesAtual++;
              if(mesAtual > 12){
                mesAtual = 1;
                this.ano++;
              }
              this.mes = this.ano + '-' + mesAtual;
              this.dataAtualCalendario = this.mes + '-01';
            break;
            case 'day':
              this.$refs.calendario.next();
              this.diaSemana = moment(this.diaSemana, 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
              this.dataAtualCalendario = this.diaSemana;          
            this.ano = parseInt(this.dataAtualCalendario.split('-')[0]);
        this.mes = this.dataAtualCalendario.split('-')[0] + '-' + this.dataAtualCalendario.split('-')[1];
            break;
            case 'week':
            this.$refs.calendario.next();
            this.diaSemana = moment(this.diaSemana, 'YYYY-MM-DD')
              .day(7)//próximo domingo
              .format('YYYY-MM-DD');
            this.dataAtualCalendario = this.diaSemana;
            this.ano = parseInt(this.dataAtualCalendario.split('-')[0]);
        this.mes = this.dataAtualCalendario.split('-')[0] + '-' + this.dataAtualCalendario.split('-')[1];
            break;
        } 
        this.estilizarDiasSemana(this.tipoCalendario);
      },
      voltar(){
        switch(this.tipoCalendario){
            case 'month':
              this.$refs.calendario.prev();
              let mesAtual = parseInt(this.mes.split('-')[1]);
  
              mesAtual--;
              if(mesAtual < 1){
                mesAtual = 12;
                this.ano--;
              }
              this.mes = this.ano + '-' + mesAtual;
              this.dataAtualCalendario = this.mes + '-01';
            break;
            case 'day':
            this.$refs.calendario.prev();
              this.diaSemana = moment(this.diaSemana, 'YYYY-MM-DD').add(-1,'days').format('YYYY-MM-DD');
            this.dataAtualCalendario = this.diaSemana;          
            this.ano = parseInt(this.dataAtualCalendario.split('-')[0]);
        this.mes = this.dataAtualCalendario.split('-')[0] + '-' + this.dataAtualCalendario.split('-')[1];
            break;          
            case 'week':
            this.$refs.calendario.prev();
              this.diaSemana = moment(this.diaSemana, 'YYYY-MM-DD')
              .day(-7)//domingo anterior
              .format('YYYY-MM-DD');
            this.dataAtualCalendario = this.diaSemana;
            this.ano = parseInt(this.dataAtualCalendario.split('-')[0]);
        this.mes = this.dataAtualCalendario.split('-')[0] + '-' + this.dataAtualCalendario.split('-')[1];
            break;
        }    
        this.estilizarDiasSemana(this.tipoCalendario);
      },
      selecionarData(e){
                this.modalMes = false;
                this.$refs.modalMes.save(e);
                this.dataAtualCalendario = e + '-01'
                this.diaSemana = this.dataAtualCalendario;
                this.ano = parseInt(e.split('-')[0]);
      },
      cadastrarNovoCompromisso(e){
        this.novoCompromisso = {
              titulo: '',
              detalhes: '',
              date: '',
              aberto: false,
              cor: 'blue',
              hour: 0,
              minute: 0,
              time: ''
            };
        this.$refs.formularioCompromisso.resetValidation();
        if(e){
          this.novoCompromisso.date = e.date;
          this.novoCompromisso.hour = e.hour;
          this.novoCompromisso.minute = e.minute;  
          this.novoCompromisso.time = e.time;
        }
        this.modalNovoCompromisso = true;
        setTimeout(() => {
  this.$refs.tituloNovoCompromisso.focus();
  }, 300);
              
      },
      retornarProximoId(){      
        this.idInterno++;
        return this.idInterno;
      },
      selecionarParaEdicao(compr){
        this.novoCompromisso = {
              id: compr.id,
              titulo: compr.titulo,
              detalhes: compr.detalhes,
              date: compr.date,
              aberto: compr.aberto,
              cor: compr.cor,
              hour: compr.hour,
              minute: compr.minute,
              time: compr.time
        };
        this.modalNovoCompromisso = true;
      },
      salvarCompromisso(){
        if(!this.$refs.formularioCompromisso.validate()){
          return;
        }
        
        if(!this.novoCompromisso.id){//cadastro
          this.novoCompromisso.id = this.retornarProximoId();           
          this.events.push(this.novoCompromisso);         
          
        }else{//edição
          let compromisso = this.events.find(e => {
              return e.id == this.novoCompromisso.id;
          });
          compromisso.titulo = this.novoCompromisso.titulo;
          compromisso.detalhes = this.novoCompromisso.detalhes;
          compromisso.cor = this.novoCompromisso.cor;
          compromisso.hour = this.novoCompromisso.hour;
          compromisso.minute = this.novoCompromisso.minute;
          compromisso.time = this.novoCompromisso.time;
          compromisso.date = this.novoCompromisso.date;
        }
        this.novoCompromisso = {
              titulo: '',
              detalhes: '',
              date: '',
              aberto: false,
              cor: 'blue',
              hour: 0,
              minute: 0,
              time: ''
            };  
        this.modalNovoCompromisso = false;
        this.$refs.formularioCompromisso.resetValidation();
      },
      excluirCompromisso(id){
        if(confirm('Tem certeza que deseja excluir esse compromisso ?')){
          var index = this.events.findIndex(e => {
            return e.id == id;
        });
        this.events.splice(index, 1);
        }
      },
      salvarHoraNovoCompromisso(){
        this.$refs.modalHora.save(this.novoCompromisso.time);
        let horaMinuto = this.novoCompromisso.time.split(':');
        this.novoCompromisso.hour = horaMinuto[0];
        this.novoCompromisso.minute = horaMinuto[1];
      }
    },
    created(){
      this.larguraTela = window.innerWidth;
    },
    watch:{
      modalNovoCompromisso(v){
        if(!v){
          this.$refs.formularioCompromisso.resetValidation();
          this.botaoAdicionarVisivel = true;
        }else{
          this.botaoAdicionarVisivel = false;
        }
      },
      tipoCalendario(tipo){
        this.estilizarDiasSemana(tipo);
      }
    }
  })