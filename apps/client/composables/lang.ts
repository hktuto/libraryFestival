

export const useLang = () => {
    const locales = [
        {key:"EN", label:"ENG"},
        {key:"HK", label:"繁"},
        {key:"CN", label:"簡"}
    ]
    
    const currentLang = useState('language',() => "EN");
    
    
    return {
        locales ,
        currentLang,
    }
}