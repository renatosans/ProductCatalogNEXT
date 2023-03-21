import { PrismaClient } from '@prisma/client';


const host       = 'localhost'
const port       = 27017
const database   = 'commercedb'
const direct     = true
const setDirect  = 'directConnection=true'


// DATABASE_URL="mongodb://localhost:27017/commercedb?directConnection=true"
let url = `mongodb://${host}:${port}/${database}`;
if (direct) {
    url = url + `?${setDirect}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export { prisma }
