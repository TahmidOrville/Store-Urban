import bcrypt from 'bcryptjs'
const users= [
    {
        name: 'Tahmid Orville',
        email: 'orvilleohin@gmail.com',
        password: bcrypt.hashSync('123456',8),
        isAdmin: true
    },
    {
        name: 'Raiyun Kabir',
        email: 'raiyun@gmail.com',
        password: bcrypt.hashSync('123456',8),
    },
    {
        name: 'Abedur Rahman',
        email: 'abed@gmail.com',
        password: bcrypt.hashSync('123456',8),

    },
]
export default users 