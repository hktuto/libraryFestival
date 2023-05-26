

export const useCategories = () => {
    const { find } = useStrapi()
    const categories = useState<any>('categories',() => ([]));

    onMounted(async () => {
        const { data } = await find<any>('catergories')
        categories.value = data
    })
    
    return {
        categories
    }
}