
import {useScreens} from "vue-screen-utils";
export const mobileHelper = () => {

   

    const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
    const isMobile = mapCurrent({sm: true, xs:true}, false)
    
    return {
        isMobile
    }
}