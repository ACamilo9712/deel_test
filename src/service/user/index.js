const jobRepo = require('../../infraestructure/job/job-repo')

const getBestProfession = async (start, end) => {
    const job = await jobRepo.getBestProfession(start, end)
    if(!job) return {status:404, error: 'No jobs found'}
    return job
}

const getBestClients = async (start, end, limit) => {
    const jobs = await jobRepo.getBestClients(start, end)
    console.log('clients :>> ',JSON.stringify(jobs));
    const clients = jobs.map(job => ({id: job.id, paid: job.paid.args[0]}))
    const counts = clients.reduce((acc, client) => ({...acc, [client.id]: (acc[client.id] || 0) + client.paid}), {})
    const bestClients = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, limit).map(id => ({id: parseInt(id), paid: counts[id]}))
    return bestClients
}

module.exports = {getBestProfession, getBestClients};