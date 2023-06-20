import {FTPYStr, JTPYStr} from "~/utils/helpers";


export const useLang = (obj:any) => {
    const route = useRoute();
    const locales = [
        {key:"EN", label:"ENG"},
        {key:"HK", label:"繁"},
        {key:"CN", label:"簡"}
    ]
    const displayLang = computed(() => locales.filter(item => item.key !== currentLang.value));
    const currentLang = useState('language',() => localStorage.getItem('locale') || 'HK');
    
    function changeLocale(key:string) {
        const res = locales.find(item => item.key === key);
        console.log(res);
        if(res){
            localStorage.setItem('locale', res.key);
        }
        const locale = localStorage.getItem('locale') || 'HK';
        console.log(locale)
        currentLang.value = locale
        
    }
    
    function t(key:string) {
        if(currentLang.value !== 'CN') {
            return obj[key + currentLang.value];
        }
        return TraditionalToSim(obj[key + "HK"])
    }

    function pureT(key:string) {
        if(currentLang.value !== 'CN') {
            return key;
        }
        return TraditionalToSim(key)
    }
    
    function tObj(key:string, localObj:any) {
        if(!key || !localObj[key + 'HK']) return "";
        if(currentLang.value !== 'CN') {
            return localObj[key + currentLang.value];
        }
        return TraditionalToSim(localObj[key + "HK"])
    }
    
    function TraditionalToSim(cc : string) {
        var str = '';
        var ss = JTPYStr();
        var tt = FTPYStr();

        for( var i=0 ; i < cc.length ; i++)
        {
            if( cc.charCodeAt(i) > 10000 && tt.indexOf( cc.charAt(i) ) != -1 )
                str += ss.charAt( tt.indexOf( cc.charAt(i) ) );
            else
                str += cc.charAt(i);
        }
        return str;
    }

    function SimToTraditional(cc : string) {
        var str = '';
        var tt = JTPYStr();
        var ss = FTPYStr();

        for( var i=0 ; i < cc.length ; i++)
        {
            if( cc.charCodeAt(i) > 10000 && tt.indexOf( cc.charAt(i) ) != -1 )
                str += ss.charAt( tt.indexOf( cc.charAt(i) ) );
            else
                str += cc.charAt(i);
        }
        return str;
    }
    

    onMounted(() => {
        if(route.query.lang) {
            if(route.query.lang === "TC") {
                changeLocale('HK')
            }
            if(route.query.lang === "SC") {
                changeLocale('CN')
            }
            if(route.query.lang === "EN") {
                changeLocale('EN')
            }
        }
    })

    
    return {
        displayLang,
        locales ,
        currentLang,
        changeLocale,
        t,
        tObj,
        SimToTraditional,
        TraditionalToSim,
        pureT
    }
}