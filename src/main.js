import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
import CardViewPlugin from 'nativescript-material-cardview/vue';
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(CardViewPlugin);
Vue.registerElement(
"CardView",
() => require("@nstudio/nativescript-cardview").CardView
);


Vue.use(RadListView);


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
import { TNSFontIcon, fonticon } from 'nativescript-fonticon' 
TNSFontIcon.debug = true;  
TNSFontIcon.paths = { fa: './assets/css/fontawesome.min.css', far: './assets/css/regular.min.css', fas: './assets/css/solid.min.css', fab: './assets/css/brand.min.css' } 
TNSFontIcon.loadCss()  

Vue.filter('fonticon', fonticon)  

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
