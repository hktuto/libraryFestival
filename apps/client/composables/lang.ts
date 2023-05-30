

export const useLang = (obj:any) => {
    const locales = [
        {key:"EN", label:"ENG"},
        {key:"HK", label:"繁"},
        {key:"CN", label:"簡"}
    ]
    const displayLang = computed(() => locales.filter(item => item.key !== currentLang.value));
    const currentLang = useState('language',() => "EN");
    
    function changeLocale(key:string) {
        const res = locales.find(item => item.key === key);
        if(res){
            currentLang.value = res.key
            return
        }
        currentLang.value = "EN"
        
    }
    
    function t(key:string) {
        return obj[key + currentLang.value];
    }
    
    function tObj(key:string, localObj:any) {
        return localObj[key + currentLang.value];
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