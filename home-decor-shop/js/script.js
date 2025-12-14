const products = [
  {id:1,title:"Ароматичні свічки «Ваніль & Лаванда»",
    description:"Набір із двох свічок для вечірнього затишку.",
    price:450,
    image: "assets/images/candles.avif"},
  {id:2,title:"Плед вʼязаний карамельний",description:"Теплий плед з обʼємною вʼязкою для дивану чи ліжка.",price:980,image:"assets/images/blanket.avif"},
  {id:3,title:"Набір декоративних подушок",description:"Подушки у теплій нейтральній палітрі.",price:720,image:"assets/images/pillows.avif"},
  {id:4,title:"Настільна лампа «Loft»",description:"Стильна лампа з металевою основою та теплою лампочкою.",price:1190,image:"assets/images/lamp.avif"},
  {id:5,title:"Керамічна ваза мінімалістична",description:"Красива декоративна ваза стриманої форми, яка підійде під будь-який інтер'єр.",price:530,image:"assets/images/vase.avif"},
  {id:6,title:"Набір постерів для стіни",description:"Чотири постери у спільній стилістиці для вітальні чи спальні.",price:640,image:"assets/images/posters.avif"}
];

function renderProducts(){
  const list=document.getElementById("productList");
  if(!list)return;
  list.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("article");
    card.className="card";
    const img=document.createElement("div");
    img.className="card__image";
    img.style.backgroundImage=`url("${p.image}")`;
    const title=document.createElement("h3");
    title.className="card__title";
    title.textContent=p.title;
    const desc=document.createElement("p");
    desc.className="card__desc";
    desc.textContent=p.description;
    const bottom=document.createElement("div");
    bottom.className="card__bottom";
    const price=document.createElement("span");
    price.className="card__price";
    price.textContent=p.price+" грн";
    const btn=document.createElement("button");
    btn.className="btn btn--outline";
    btn.type="button";
    btn.textContent="У кошик";
    btn.addEventListener("click",()=>alert(`Товар «${p.title}» додано (демо).`));
    bottom.append(price,btn);
    card.append(img,title,desc,bottom);
    list.append(card);
  });
}

function setupBurger(){
  const burger=document.getElementById("burgerBtn");
  const nav=document.getElementById("navMenu");
  if(!burger||!nav)return;
  burger.addEventListener("click",()=>{
    burger.classList.toggle("burger--active");
    nav.classList.toggle("nav--open");
  });
  nav.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click",()=>{
      burger.classList.remove("burger--active");
      nav.classList.remove("nav--open");
    });
  });
}

function scrollToCatalog(){
  const c=document.getElementById("catalog");
  if(c)c.scrollIntoView({behavior:"smooth",block:"start"});
}

document.addEventListener("DOMContentLoaded",()=>{
  renderProducts();
  setupBurger();
  window.scrollToCatalog=scrollToCatalog;
});
