export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));


        return { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTMiLCJpYXQiOjE2OTU3MzE2NDksImV4cCI6MTY5NTgxODA0OX0.ccQFkL6sYITrJe91NMF5Hbm0hjOTBCEhP5hJF-bLTfY" };

}