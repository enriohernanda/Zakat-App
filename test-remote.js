fetch("https://zakat-app-phi.vercel.app/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email: "test_remote@test.com", password: "password123" })
})
.then(async res => {
  console.log("STATUS:", res.status);
  console.log("BODY:", await res.text());
})
.catch(err => console.error("ERR:", err));
