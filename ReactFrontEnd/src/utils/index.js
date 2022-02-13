export function formatCurrencyVN(number) {
    if(!number){
        return "0"
    }

    return number
        .toString()
        .replace(/\./g, ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}