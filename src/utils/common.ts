export function formatNumber(num: number) {
    if (!num) return num
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
