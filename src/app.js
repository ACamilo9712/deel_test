const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getContract, getContracts} = require('./application/contract');
const {getUnpaidJobs, payJob} = require('./application/job');
const {depositBalance} = require('./application/balance');
const {getBestProfession, getBestClients} = require('./application/user');

app.use(bodyParser.json());

app.get('/contracts/:id', async (req, res) => {
    const {id} = req.params
    const contract = await getContract(id)
    if(!contract) return res.status(404).end()
    res.json(contract)
})

app.get('/contracts', async (req, res) => {
    const contracts = await getContracts(req.profile.id)
    res.json(contracts)
})

app.get('/jobs/unpaid', async (req, res) => {
    const jobs = await getUnpaidJobs()
    res.json(jobs)
})

app.post('/jobs/:job_id/pay', async (req, res) => {
    const {job_id} = req.params
    const result = await payJob(job_id)
    if(result.error) return res.status(result.status).end(result.error)
    res.status(200).end()
})

app.post('/balances/deposit/:userId', async (req, res) => {
    const {userId} = req.params
    const {amount} = req.body
    const result = await depositBalance(userId, amount, req.profile)
    if(result.error) return res.status(result.status).end(result.error)
    res.status(200).end()
})

app.get('/admin/best-profession', async (req, res) => {
    const {start, end} = req.query
    const bestProfession = await getBestProfession(start, end)
    res.json({bestProfession})
})

app.get('/admin/best-clients', async (req, res) => {
    const {start, end, limit = 2} = req.query
    const bestClients = await getBestClients(start, end, limit)
    res.json(bestClients)
})

module.exports = app;