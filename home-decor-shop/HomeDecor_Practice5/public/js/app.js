const API = "/api/products"; // бо фронт і бек в одному сервері

const statusEl = document.getElementById("status");
const listEl = document.getElementById("list");

function render(items){
  listEl.innerHTML = "";
  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<b>${p.name}</b><div class="muted">id: ${p.id} • ${p.price} грн</div>`;
    listEl.appendChild(div);
  });
}

async function load(){
  statusEl.textContent = "Loading...";
  try{
    const res = await fetch(API);
    const data = await res.json();
    render(data);
    statusEl.textContent = `OK (${data.length})`;
  }catch(e){
    console.error(e);
    statusEl.textContent = "Error (дивись Console)";
  }
}

async function add(){
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  if(!name || !price){
    alert("Введи name і price");
    return;
  }
  try{
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name, price})
    });
    if(!res.ok){
      const err = await res.json().catch(()=>({}));
      throw new Error(err.message || "POST failed");
    }
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    alert("Додано! Натисни “Завантажити товари”.");
  }catch(e){
    console.error(e);
    alert("Помилка: " + e.message);
  }
}

document.getElementById("loadBtn").addEventListener("click", load);
document.getElementById("addBtn").addEventListener("click", add);

// auto-load
load();
