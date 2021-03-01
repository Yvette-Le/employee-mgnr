/*
fetch('../../server/data/users.json')
.then (res => {
    console.log(res);
    return res.json();
})
.then (res =>{
    console.log(res)
    const theData = document.getElementById('user')
    theData.innerHTML = JSON.stringify(res);
    return theData;
})
*/

async function getData(){
    const res = await fetch('../../server/data/users.json')
    const data = await res.json()


    const showData = document.getElementById('user');
    showData.innerHTML=JSON.stringify(data);
    //console.log(data)
   /* data.forEach(function(entry){
        //console.log(entry)
        const showData = document.getElementById('user');
        showData.innerHTML=JSON.stringify(entry);
    })
    */

    }


getData();