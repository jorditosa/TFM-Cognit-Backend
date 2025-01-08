import colors from 'colors'
import server from './server'

const port = process.env.PORT || 3005

server.listen(port, () => {
    console.log( colors.cyan.bold( `REST Api on port ${port}`))
})
