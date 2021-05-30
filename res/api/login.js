const register = (email, password) =>(
    fetch('http://192.168.1.8:80/language/login.php',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    .then(res=> res.text())  
    .catch((error)=>{
        console.error(error);
    })    
);
module.exports = login; 