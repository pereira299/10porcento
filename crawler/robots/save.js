const {connection, Categories, Word} = require('../database');

const createCategory = async (category) => {
        return await Categories.create({
            name: category
        },{
            returning: ['id']
        })
}

const createWord = async (term, category_id) => {
    const { origin, formatted } = term;
        await Word.create({
            term: origin,
            term_formatted: formatted,
            category_id,
            count_typed: 0
        })
}

const create = async (category, terms) => {
    const category_id = await createCategory(category.name);
    for(const term of terms){
        await createWord(term, category_id.id);
    }
}

const main = async (category, terms) => {
    await create(category, terms);
};

module.exports = main;