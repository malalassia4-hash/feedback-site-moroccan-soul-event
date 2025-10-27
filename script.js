const ENDPOINT = "https://script.google.com/macros/s/AKfycbxF2fnCHVfxrxXwfihZX1QC-RRyKmsjU-JeW3uFSrPIsVs8qRLCNNT2qoZErVhEUA/exec "; // ضع هنا الرابط الخاص بك

document.getElementById('feedbackForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = "جارٍ الإرسال...";

  const form = e.target;
  const data = {
    impression: form.impression.value || null,
    besoin: form.besoin.value || null,
    services: Array.from(form.querySelectorAll('input[name="services"]:checked')).map(i=>i.value),
    design: form.design.value || null,
    note: form.note.value || null,
    element: form.element.value || null,
    regrouper: form.regrouper.value || null,
    app: form.app.value || null,
    langue: form.langue.value || null,
    conseil: form.conseil.value || null,
    submittedAt: new Date().toISOString()
  };

  try{
    const res = await fetch(ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
    if(!res.ok){console.warn("Server returned non-OK",res.status);}
  }catch(err){
    console.warn("Send failed",err);
  }finally{
    form.style.display = "none";
    document.getElementById('thanks').style.display = "block";
    btn.disabled = false;
    btn.textContent = "Envoyer";
  }
  return false;
});