const BASE_URL = 'http://localhost:8070'

export const post = async (path, body) => {
    const response = await fetch(`${BASE_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}

export const put = async (path, body) => {
    const response = await fetch(`${BASE_URL}/${path}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}

export const get = async (path) => {
    const response = await fetch(`${BASE_URL}/${path}`)

    return await response.json()
}

export const del = async (path) => {
    const response = await fetch(`${BASE_URL}/${path}`, { method: 'DELETE' })

    return await response.json()
}