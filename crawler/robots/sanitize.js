
const formatted = {
    original: (text) => {
        return text.charAt(0).toUpperCase() + text.substring(1).trim();
    },
    lower: (text) => {
        return text.normalize('NFD').replace(/([\u0300-\u036f]|[^\s0-9a-zA-Z])/g, '').toLowerCase().trim();
    }
}





const main = (data) => {
    const itens = typeof data[0] == 'string' ? data : data[0];
    return itens.map(elem => {
        let text = elem.split("\n").filter(item => !!item ).map(item => {
            if(item.indexOf("(") >= 0){
                item = item.substring(0, item.indexOf("("));
            }
            if(item.indexOf(",") >= 0){
                item = item.substring(0, item.indexOf(","));
            }
            if(item.indexOf(".") >= 0){
                item = item.substring(0, item.indexOf("."));
            }
            if(item.indexOf(";") >= 0){
                item = item.substring(0, item.indexOf(";"));
            }
            return item.trim();
        })
        if(text.length == 1){
            return {
                origin: formatted.original(text[0]),
                formatted: formatted.lower(text[0])
            }
        }else {
            return text.map(item => {
                return {
                    origin: formatted.original(item),
                    formatted: formatted.lower(item)
                }
            })
        }
    }).flat();
};

module.exports = main;