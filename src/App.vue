<template>
  <div id="app">
    <!--<router-view :userLang="currentLang" :lang="lang" @qr-header="qrHeaderChange"></router-view>-->
    <cta_header :langs="langs" :current-lang="currentLang" @change-lang="changeLang" :branch-name="branchName" :branch-logo="branchLogo" />
    <main>
      <p class="question">{{question}}</p>
      <p class="sub-title">{{lang.choose_text}}</p>
      <div class="answers">
        <form id="answers" @change="sendAnswer">
          <label v-for="answer in answers">
            <input type="radio" name="answerId" :value="answer.id">
            <div>{{answer.answer}}</div>
          </label>
        </form>
      </div>
    </main>
    <cta_footer  />
  </div>
</template>

<script>
    import cta_header from './components/cta_header.vue';
    import cta_footer from './components/cta_footer.vue';
    import coockies from './assets/js/coockies.js';
    import axios from 'axios';
    import serialize from './assets/js/serialize.js';
    import ru from './assets/translation/ru.json';
    import en from './assets/translation/en.json';
    import fr from './assets/translation/fr.json';
    import ua from './assets/translation/ua.json';


export default {
  name: 'app',
  components: {
      cta_footer,
      cta_header
  },
  data(){
      return {
         langs: site_defaults.language.langs,
         currentLang: '',
         lang: {}, // translations
         branchName: '',
         branchLogo: '',
         question: '',
         answers: {},
         ctaId: ''
      }
  },
  methods: {
      changeLang(langIndex){
          console.log(langIndex);
          this.lang = get_translations(langIndex);
          coockies.set('lang', langIndex);
      },

      sendAnswer(e){
          console.log(serialize(e.target.form));
          axios.post('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/cta/scanCta?'+serialize(e.target.form)+'&ctaId='+this.ctaId)
              .then((resp) => {
                  // console.log(resp.data);
                  // if(resp.data.success){
                  //
                  // }
              })
      }
  },
  created(){

      // localisation
      if(coockies.get('lang') === undefined){
          coockies.set('lang', user_defaults.language);
          this.lang = get_translations(user_defaults.language);
      } else {
          this.lang = get_translations(coockies.get('lang'));
      }
      this.currentLang = this.lang.lang; // this.lang.lang equals language index (eg. en)
      // localisation

      // save GET paramethers
      if( coockies.findGetFromUrl('ctaId') != null ){
          console.log('ok');

          this.ctaId = coockies.findGetFromUrl('ctaId');
          localStorage.setItem('ctaId', coockies.findGetFromUrl('ctaId'));
          history.replaceState( {} , '/', '/' );

      } else if(coockies.findGetFromUrl('ctaId') === null && localStorage.getItem('ctaId') === null) {
          alert('No ctaId data');
      }
      // save GET paramethers

      axios.get('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/cta/getCta?ctaId=' + localStorage.getItem('ctaId'))
          .then((resp) => {
              console.log(resp.data);
              if(resp.data.success){
                  this.branchName = resp.data.message.branchName;
                  this.branchLogo = resp.data.message.logo_url;
                  this.question = resp.data.message.question;
                  this.answers = resp.data.message.answer;
              } else {
                  console.log('no data');
              }

          })
  }


}


var urlParams = new URLSearchParams(window.location.search);
const user_defaults = {
    language: navigator.language.split('-')[0]
};


const site_defaults = {
    language: {
        langs: ['fr', 'ua', 'ru','en'],
        default_lang: 'en',
        langs_trns: {
            'fr': fr,
            'ru': ru,
            'en': en,
            'ua': ua
        },

    }
};

function get_translations(lang){
    var lang_index = site_defaults.language.langs_trns[site_defaults.language.default_lang];

    if(lang && (site_defaults.language.langs.indexOf(lang) != -1) ){
        lang_index = site_defaults.language.langs_trns[lang];
    } else {
        if(site_defaults.language.langs.indexOf(user_defaults.language) != -1){
            lang_index = site_defaults.language.langs_trns[user_defaults.language];
        }
    }
    return lang_index;
}


</script>

<style>
  @import 'assets/css/style.css';
  @import 'assets/fonts/fonts.css';
</style>
