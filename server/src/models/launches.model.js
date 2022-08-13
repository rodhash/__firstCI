
const launches = new Map()

let latestLaunchNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-422 b',
    customer: ['ZTM', 'Nasa'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestLaunchNumber++
    launches.set(
        latestLaunchNumber,
        Object.assign(launch, {
            upcoming: true,
            success: true,
            customer: ['ZTM'],
            flightNumber: latestLaunchNumber
        })
    )
}

// check if launch exists
function launchExistsWithId(launchId) {
    return launches.has(launchId)
}

// delete it
function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}



module.exports = {
    getAllLaunches,
    addNewLaunch,
    launchExistsWithId,
    abortLaunchById
}

