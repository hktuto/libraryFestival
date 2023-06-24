
import {useScreens} from "vue-screen-utils";
export const mobileHelper = () => {

   

    const { mapCurrent, cleanup } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' });
    const isMobile = mapCurrent({sm: true, xs:true}, false)
    const columns = mapCurrent({lg: 3}, 1);
    const isFullSize = mapCurrent({xl:true}, false)

   
    
    return {
        isMobile,
        columns,
        isFullSize
    }
}