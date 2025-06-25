// Import the framework and instantiate it
import Fastify from 'fastify'
import heapdump from 'heapdump'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
    return { hello: 'world' }
})

fastify.get('/heapdump', async function handler (request, reply) {
    // Example memory leak simulation
    const leaky = [];
    let count = 0;

    setInterval(() => {
    // Simulate memory usage
    leaky.push(new Array(1e5).fill('*'));
    console.log(`Allocated ${leaky.length} million-element arrays`);
    count++;
    logMemoryUsage();

    // Take a heap snapshot every 10 iterations
    if (count % 10 === 0) {
        const filename = `heapdump-${Date.now()}.heapsnapshot`;
        heapdump.writeSnapshot(filename, (err, filename) => {
        if (err) console.error('Heapdump failed:', err);
        else console.log('Heapdump written to', filename);
        });
    }
    }, 1000);
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}





function logMemoryUsage() {
    const mem = process.memoryUsage();
    console.log(`Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log('---');
}