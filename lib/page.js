exports.show = function (pagePath,total, pagesize, page) {
    page = parseInt(page);
    var pagenum = Math.ceil(total / pagesize);
    var min = page > 3 ? page - 2 : 1;
    var max = page + 2 > pagenum ? pagenum : min + 4;
    return {
        pagePath: pagePath,
        pagenum: pagenum,
        total: total,
        pagesize: pagesize,
        page: page,
        min: min,
        max: max,
        prev: page - 1 > 0 ? page - 1 : 1,
        next: page + 1 < pagenum ? page + 1 : pagenum
    };
};