import {FTPYStr, JTPYStr} from "~/utils/helpers";


export const useLang = (obj:any) => {
    const locales = [
        {key:"EN", label:"ENG"},
        {key:"HK", label:"繁"},
        {key:"CN", label:"簡"}
    ]
    const displayLang = computed(() => locales.filter(item => item.key !== currentLang.value));
    const currentLang = useState('language',() => "HK");
    
    function changeLocale(key:string) {
        const res = locales.find(item => item.key === key);
        if(res){
            currentLang.value = res.key
            return
        }
        currentLang.value = "HK"
        
    }
    
    function t(key:string) {
        if(currentLang.value !== 'CN') {
            return obj[key + currentLang.value];
        }
        return TraditionalToSim(obj[key + "HK"])
    }
    
    function tObj(key:string, localObj:any) {
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
    

    
    return {
        displayLang,
        locales ,
        currentLang,
        changeLocale,
        t,
        tObj
    }
}