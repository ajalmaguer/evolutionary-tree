require('./configDatabase');
const Node = require('../models/Node');

seed()
    .catch(err => console.log(err))
    .then(() => process.exit());


async function seed() {
    await Promise.all([Node.deleteMany({})]);
    await Node.create([
        {
            name: 'Amoeba',
            path: null,
        },
        {
            name: 'Virus',
            path: null,
        },
        {
            name: 'Bacteria',
            path: null,
        },
        {
            name: 'Algae',
            path: null,
        },
    ])
    const nodes = await Node.find({});

    const nodesByName = {};
    nodes.forEach(node => {
        nodesByName[node.name] = node;
    });
    const { Amoeba, Virus, Bacteria, Algae } = nodesByName;


    // add virus to amoeba
    Amoeba.childIds.push(Virus._id);
    Virus.path = `,${Amoeba._id},`

    // add bacteria to amoeba
    Amoeba.childIds.push(Bacteria._id);
    Bacteria.path = `,${Amoeba._id},`

    // add algae to bacteria
    Bacteria.childIds.push(Algae._id);
    Algae.path = Bacteria.path + `${Bacteria._id},`;

    await Promise.all([
        Amoeba.save(),
        Virus.save(),
        Bacteria.save(),
        Algae.save(),
    ]);

    console.log('saved nodes', await Node.find({}))

    process.exit();
};

