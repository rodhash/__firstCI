
const express = require('express')

const {
    getAllLaunches,
    addNewLaunch,
    launchExistsWithId,
    abortLaunchById
} = require('../../models/launches.model')

const httpGetAllLaunches = (req, res) => {
    res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.target
        || !launch.launchDate) {
        return res.status(400).json({
            error: "Missing required property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid / Missing date"
        })
    }


    addNewLaunch(launch)
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = +req.params.id

    if (!launchExistsWithId(launchId)) {
        return res.status(404).json({ erro: "Launch not found" })
    }

    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}

