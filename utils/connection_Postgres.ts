import { PrismaClient } from '@prisma/client';


const host     = 'localhost'
const port     = 5432
const username = 'postgres'
const password = 'p@ssw0rd'
const database = 'commercedb'
const ssl      = false
const setSSL   = 'sslaccept=strict&sslmode=require'


// DATABASE_URL="postgresql://postgres:p@ssw0rd@localhost:5432/commercedb"
let url = `postgresql://${username}:${password}@${host}:${port}/${database}`;
if (ssl) {
    url = url + `?${setSSL}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export { prisma }
