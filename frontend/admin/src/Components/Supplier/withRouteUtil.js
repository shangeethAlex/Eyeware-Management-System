import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const withRouteUtil = Component => props => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = useSearchParams()

    return (
        <Component
            {...props}
            params={params}
            navigate={navigate}
            location={location}
            searchParams={searchParams}
        />
    )
}

export default withRouteUtil