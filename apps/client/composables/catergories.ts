

export const useCategories = () => {
    const { find } = useStrapi()
    const categories = useState<any>('categories',() => ([]));

    onMounted(async () => {
        const { data } = await find<any>('catergories')
        categories.value = data
    })

    const searchCategory = computed(() => categories.value.filter((category: any) => category.id !== 7 && category.id !== 8) )
    
    return {
        categories,
        searchCategory
    }
}