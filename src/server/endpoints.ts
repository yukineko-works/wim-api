import Endpoint from './ep.js'
import ApiIndex from './api/index.js'
import ApiSave from './api/save.js'
import ApiLoad from './api/load.js'

type Endpoints = {
    route: string,
    ep: Endpoint
}[]

export default [{
    route: '/',
    ep: ApiIndex
}, {
    route: '/save',
    ep: ApiSave
}, {
    route: '/load',
    ep: ApiLoad
}] as Endpoints