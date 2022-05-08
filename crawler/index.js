const robots = {
    extract: require("./robots/extract"),
    sanitize: require("./robots/sanitize"),
    save: require("./robots/save")
}

const categories = [
    {
        name: "animais",
        url: "https://www.dicio.com.br/animais-de-a-a-z/"
    },
    {
        name: "objetos",
        url: "https://www.dicio.com.br/objetos-de-a-a-z/"
    },
    {
        name: "frutas",
        url: "https://www.dicio.com.br/frutas-de-a-a-z/"
    },
    {
        name: "elogios",
        table: true,
        url: "https://www.dicio.com.br/elogios-de-a-a-z/"
    },
    {
        name: "pais",
        url: "https://www.dicio.com.br/paises-de-a-a-z/"
    },
    {
        name: "cor",
        url: "https://www.dicio.com.br/alfabeto-de-cores-lista-de-cores-de-a-z/"
    },
    {
        name:"instrumento musical",
        url: "https://www.dicio.com.br/instrumentos-musicais/",
    },
    {
        name:"qualidade",
        col: 1,
        table: true,
        url:"https://www.dicio.com.br/qualidades-e-defeitos-de-uma-pessoa-lista-de-adjetivos-de-a-z/"
    },
    {
        name:"defeito",
        col: 2,
        table: true,
        url:"https://www.dicio.com.br/qualidades-e-defeitos-de-uma-pessoa-lista-de-adjetivos-de-a-z/"
    },
    {
        name:"sentimento positivo",
        table: true,
        col: 1,
        url:"https://www.dicio.com.br/lista-de-sentimentos/"
    },
    {
        name:"sentimento negativo",
        table: true,
        col:2,
        url:"https://www.dicio.com.br/lista-de-sentimentos/"
    },
    {
        name:"som de animal",
        col: 2,
        table: true,
        url:"https://www.dicio.com.br/sons-de-animais/"
    },
    {
        name:"verdura",
        col: 2,
        table: true,
        url:"https://www.dicio.com.br/lista-de-legumes-e-verduras-de-a-a-z/"
    },
    {
        name:"legume",
        col: 1,
        table: true,
        url:"https://www.dicio.com.br/lista-de-legumes-e-verduras-de-a-a-z/"
    },
    {
        name:"verbo",
        table: true,
        url:"https://www.dicio.com.br/lista-de-verbos/"
    },
    {
        name:"palindromo",
        url:"https://www.dicio.com.br/lista-palindromos/"
    },
]
const saveDataFromWeb = async (elem) => {
    console.log("Buscando dados de " + elem.name);
        debugger
        const data = await robots.extract(elem).then((res) => {
            if(elem.name !== "palindromo") return res;
            return res.filter((item) => {
                return !/[\s 0-9]/g.test(item);
            })
        })
        
        const sanitizedData = robots.sanitize(data);
        await robots.save(elem, sanitizedData);
        console.log(elem.name + " completo");
}

const main = async () => {
        for (const cat of categories) {
            await saveDataFromWeb(cat);
        }
    
}

main();