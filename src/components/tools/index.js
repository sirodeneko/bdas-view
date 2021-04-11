const unixtimeToString =(cjsj)=>{
    if (cjsj / 10000000000 <= 1) {
        cjsj = cjsj * 1000;
    }
    var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

export{
    unixtimeToString,
}