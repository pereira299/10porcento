const puppeteer = require('puppeteer');

const init = async () => {
    const browser = await puppeteer.launch();
    const page = await  browser.newPage()
    
    return browser;
}

const newPage = async (browser, url) => {
    const page = await browser.newPage();
    if(url.length > 0){
        await page.goto(url, {
            waitUntil: 'networkidle2',
        })
    }
    return page
}

const getData = async (page, category) => {
    const data = await page.evaluate(({category}) => {
        
        const res = [];
        let elems;
        if(!!category.table){
            if(category.col){
                elems = document
                .querySelectorAll(`tr td:nth-child(${category.col}) p`)
                if(elems.length == 0)
                elems = document
                .querySelectorAll(`tr td:nth-child(${category.col})`)
            }else {
                elems = document
                .querySelectorAll(`tr td p`)

                if(elems.length == 0)
                    elems = document
                    .querySelectorAll(`tr td`)
            }
        }else {
            elems = document
            .querySelectorAll('.box ul > li:not(.item):not(.deselected)')
            
        }
        
        for (const elem of elems) {
            if(elems.length == 1)
                res.push(elem.innerText.split("\n"))
            else    
                res.push(elem.innerText);
        }
        return res;
    }, {category})
    return data;
}


const main = async (item) => {
    const browser = await init();
    const page = await newPage(browser, item.url);
    const data = await getData(page, item);
    await browser.close();

    return data;

};

module.exports = main;