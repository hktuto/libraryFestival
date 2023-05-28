

export const useLang = () => {
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
    
    return {
        displayLang,
        locales ,
        currentLang,
    }
}