


import axios from "axios"

test('Modifier profile', () => {


    const config = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaW1hc3NpbWVoZGk1OEBnbWFpbC5jb20iLCJleHAiOjE2MjMzNzgyMjgsImlhdCI6MTYyMzM0MjIyOH0.NkH5mdqHUj2EaxMEH5_Dw7qWRCKDiys89Qe9XLYpPkc'
        }
    }

    const UserUpdated = {
        firstName : "tEST",
        lastName : "tEST",
        email : "TSTTT@TSET.COM",
        numtel : "22",

    }

    axios.put(`http://localhost:8080/IngUpdate/42`, {user :UserUpdated} ,config

    )
        .then(res => {
            expect(res.data.user.firstName).toEqual(UserUpdated.firstName)
            expect(res.data.user.firstName).toEqual(UserUpdated.lastName)
            expect(res.data.user.firstName).toEqual(UserUpdated.email)
            expect(res.data.user.firstName).toEqual(UserUpdated.numtel)
            expect(res.data.ms).toBeTruthy()
            expect(res.status).toBe(200)
        })
})