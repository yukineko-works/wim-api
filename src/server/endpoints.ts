import Endpoint from './ep.js'
import ApiSettings from './api/settings.js'

type Endpoints = {
    route: string,
    ep: Endpoint
}[]

export default [{
    route: '/:userId/:worldId',
    ep: ApiSettings
}, {
    route: '/:userId',
    ep: ApiSettings
}] as Endpoints