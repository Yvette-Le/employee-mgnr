
async function getData(){
    const res = await fetch('../../server/data/users.json')
    const data = await res.json()

    const showData = document.getElementById('user');
    showData.innerHTML=JSON.stringify(data);
    }

getData();