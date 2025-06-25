// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
    const arr = [];

    try{
        while (true) {
            arr.push(new Array(1e6).fill('*'));
            console.log(`Allocated ${arr.length} million-element arrays`);
            console.log(process.memoryUsage());
          }
    }catch(err){
        return { err }
    }

})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}