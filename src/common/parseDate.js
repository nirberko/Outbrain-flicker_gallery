export default (dateString) => {
    const match = dateString.match(/^([\d]{4,})-([\d]{2,})-([\d]{2,})/);

    return match.filter((_, i) => i > 0).reverse().join('-');
}