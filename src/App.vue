<template>
  <div id="app">
    <router-view :userLang="currentLang" :lang="lang" @qr-header="qrHeaderChange"></router-view>
  </div>
</template>

<script>
    import coockies from './assets/js/coockies.js';
    import ru from './assets/translation/ru.json';
    import en from './assets/translation/en.json';
    import fr from './assets/translation/fr.json';
    import ua from './assets/translation/ua.json';


export default {
  name: 'app',
  components: {},
  data(){
      return {
         langs: site_defaults.language.langs,
         currentLang: '',
         lang: {}, // translations,
      }
  },
  methods: {
      changeLang(langIndex){
          this.lang = get_translations(langIndex);
          coockies.set('lang', langIndex);
      },
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

          localStorage.setItem('ctaId', coockies.findGetFromUrl('ctaId="'));
          // history.replaceState( {} , '/', '/' );

      } else if(coockies.findGetFromUrl('ctaId') === null && localStorage.getItem('ctaId') === null) {
          alert('No ctaId data');
      }

      // save GET paramethers
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

</style>
