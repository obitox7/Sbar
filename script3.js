let box=document.getElementById("box");
function buy(){
    const data={
        
            name:document.getElementById("name").value,
            phone:document.getElementById("phone").value,
            state:document.getElementById("state").value,
            pincode:document.getElementById("pincode").value,
            city:document.getElementById("city").value,
            address:document.getElementById("address").value,
        
    };
    fetch("https://script.google.com/macros/s/AKfycbwO3yaTWrXldwQx17wtvsZaIb81VLpVaLePCez4yL9MT-SmJNufBpnGGegWxvy5S5c3Zg/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
          box.style.backgroundColor="blue";
          })
      .catch(err => {
        console.error("Error:", err);
      });
    }