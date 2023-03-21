import { prisma } from '../utils/connection'
import { allCategories, allMeasurementUnities, allSuppliers } from '../utils/seedData'


// run the command on terminal to populate data
// >  prisma db seed
async function main() {

    await prisma.categoria.createMany({ data: allCategories })
    await prisma.unidademedida.createMany({ data: allMeasurementUnities })
    await prisma.fornecedor.createMany({ data: allSuppliers })
}

main()
.catch(async (e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})
