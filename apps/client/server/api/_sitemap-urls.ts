
export default cachedEventHandler(async () => {
    try{

        const [
            page ,
            program,
            category,
            past,
        ]:any = await Promise.all([
            $fetch(process.env.STRAPI_URL + '/api/pages?pagination[start]=0&pagination[limit]=1000&populate=%2A'),
            $fetch(process.env.STRAPI_URL + '/api/events?pagination[start]=0&pagination[limit]=1000&populate=%2A'),
            $fetch(process.env.STRAPI_URL + '/api/catergories?pagination[start]=0&pagination[limit]=1000&populate=%2A'),
            $fetch(process.env.STRAPI_URL + '/api/pasts?pagination[start]=0&pagination[limit]=1000&populate=%2A')
        ])
        const result = [];
        result.push(...page.data.map((item:any) => ({loc: '/page/' + item.attributes.slug, lastmod: item.attributes.updatedAt}) ) )
        result.push(...program.data.map((item:any) => ({loc: '/program/' + item.id, lastmod: item.attributes.updatedAt}) ) )
        result.push(...category.data.map((item:any) => ({loc: '/category/' + item.id, lastmod: item.attributes.updatedAt }) ) )
        result.push(...past.data.map((item:any) => ({loc: '/past/' + item.id, lastmod: item.attributes.updatedAt}) ) )
        return result;
    } catch(err) {
        console.log(err)
        return []
    }
  }, {
    name: 'sitemap-dynamic-urls',
    maxAge: 60 * 10 // cache URLs for 10 minutes
  })