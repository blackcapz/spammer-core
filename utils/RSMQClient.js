const RSMQPromise = require('rsmq-promise')

const rsmq = new RSMQPromise({
  host: '127.0.0.1',
  port: 6379
})
const Q_NAME = 'SPAMMER'

exports.rsmq = rsmq
exports.Q_NAME = Q_NAME
exports.createQueue = async () => {
  const queues = await rsmq.listQueues()
  if (queues.includes(Q_NAME)) return
  await rsmq.createQueue({ qname: Q_NAME })
}
