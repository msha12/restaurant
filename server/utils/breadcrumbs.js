
const breadcrumbs = (req) => {
    const path = req.originalUrl;                     
    let parts = path.split('/').filter(Boolean); 
    parts = parts.filter(p => !/^[0-9a-fA-F]{24}$/.test(p));
    const current = parts[parts.length - 1] || '' 
    const previous = parts.slice(0, -1).join('/');

    const currentPage =  `${previous}/${current}`

    return currentPage
}

module.exports = breadcrumbs