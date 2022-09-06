module.exports = {
    secret:"9f321e43-989c-4d0b-8c37-be61bf292e11",
    header:{
        typ: 'JWT',
        alg: 'HS256'
    },
    crypto:"sha256",
    // expire:60 * 1000 * 60 * 24, // one day
    expire:60 * 1000,
    port:3001
}
