const fastify = require('fastify')({
  logger:true
})

fastify.post('/', function(request,reply) {
  console.log(request.body)
  let x = request.body
  console.log('****')
  console.log(x.template)
  console.log(x.teste.oi)
  console.log('****')
  reply.send({x});
})

fastify.listen(3000, function(err, address){
  if (err){
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
})