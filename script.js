// fetch("https://openapi.programming-hero.com/api/categories")
// .then(res=>res.json())
// .then((data) => {
//     console.log(data);
// })
// .catch((e) => console.log(e));


const catagorisContainer = document.getElementById("catagories-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const treesContainer = document.getElementById("treesContainer");
const allTreesbtn = document.getElementById("allTreesbtn");

const treeDetailsModal = document.getElementById("tree-details-modal");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");
const emptyCartMessage = document.getElementById("emptyCartMessage");
let cart = [];



function showLoading (){
  loadingSpinner.classList.remove("hidden")
  treesContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden")

}




async function loadCatagories(){
//     fetch("https://openapi.programming-hero.com/api/categories")
// .then(res=>res.json())
// .then((data) => {
//     console.log(data);
// })
// // .catch((e) => console.log(e));

// modern 

const res = await fetch("https://openapi.programming-hero.com/api/categories")
const data = await res.json();
catagoriesDisplay(data.categories);

}
loadCatagories();




function catagoriesDisplay(doros){
    const categoriesContainer = document.getElementById("catagories-container");
    catagorisContainer.innerHTML = "";

    for(let doro of doros){
        console.log(doro);
        const creat = document.createElement("div");

        creat.innerHTML =`
       <button onclick="selectCategory(${doro.id},this)" class="btn btn-success btns bg-white w-full">${doro.category_name}</button>
`;
catagorisContainer.append(creat);


    }
}





async function selectCategory(categoryId ,btns){
  console.log(categoryId,btns);
     showLoading();
      await new Promise(resolve => setTimeout(resolve,2000));
// const allBtns = document.querySelectorAll(".btns");
const allBtns = document.querySelectorAll("#catagories-container button, #allTreesbtn")
// console.log(allBtns);

allBtns.forEach(btn => {

   btn.classList.remove("btn-primary");
   btn.classList.add("btn-outline");

}
);
 btns.classList.add("btn-primary");
  btns.classList.remove("btn-outline");

const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
const data = await res.json();
displayTrees(data.plants);
hideLoading();

}





document.getElementById("allTreesbtn")
.addEventListener("click", function(){

   const allBtns = document.querySelectorAll("#catagories-container button, #allTreesbtn");

   allBtns.forEach(btn => {

      btn.classList.remove("btn-primary");

      btn.classList.add("btn-outline");

   });

   allTreesbtn.classList.add("btn-primary");

   allTreesbtn.classList.remove("btn-outline");
      loadTreese();

});




async function loadTreese() {
      showLoading();
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json()


     displayTrees(data.plants)
         hideLoading();
    
}

function displayTrees(trees){
    console.log(trees)
    treesContainer.innerHTML = "";
    // treesContainer.innerHTML = "";
    trees.forEach(tree=>{
        // console.log(tree);
        const card = document.createElement("div");
        // or 
        // card.className = "card bg-base-100 shadow-sm";
          
        card.innerHTML = `
     <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src =" ${tree.image}"
      alt= "${tree.name}"
      title = "${tree.name}"
      class = "h-48 w-full object-cover"
      onclick="openTreeModal(${tree.id});"

       />
  </figure>
  <div class="card-body">
    <h2 class="card-title" >${tree.name}</h2>
    <p class="line-clamp-2">${tree.description}</p>
         <div class="badge badge-success">${tree.category}</div>
    <div class="flex justify-between items-center gap-2">
        <h2 class="font-bold text-xl text-[#4ade80]">${tree.price}</h2>
<button 
class="btn btn-primary bg-[#4ade80]"
onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">
Cart
</button>

    </div>
  </div>
</div>`;

 treesContainer.append(card);
})

}        
// connected line with 163 line   onclick openTreeModal(treeId)

async function openTreeModal(treeId){
  console.log(treeId ,"treeId")
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
  const data = await res.json()
  const plantDetails = data.plants;
  console.log(plantDetails)

  modalTitle.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategory.textContent = plantDetails.category;
  modalPrice.textContent = plantDetails.price;
  modalDescription.textContent = plantDetails.description; 

                   // or 
//   modalTitle.textContent = data.plants.name;
// modalImage.src = data.plants.image;
// modalCategory.textContent = data.plants.category;
// modalPrice.textContent = data.plants.price;
// modalDescription.textContent = data.plants.description;

// textContent or innerText 

// modalCategory.innerText = plantDetails.category;
// modalPrice.innerText = plantDetails.price;
// modalDescription.innerText = plantDetails.description;

    treeDetailsModal.showModal();


}
  //note: openMOdal function er 2nd step kintu 
  // jekono secion e modalContainer name id make korte hobe html e

// async function openTreeModal(treeId){

//   const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
//   const data = await res.json();

//   const plantDetails = data.plants;

//   // 1. container ধরলাম
//   const modalContainer = document.getElementById("modalContainer");

//   // 2. container empty করলাম
//   modalContainer.innerHTML = "";

//   // 3. নতুন div বানালাম
//   const div = document.createElement("div");

//   // 4. div এর ভিতরে data দিলাম
//   div.innerHTML = `
//     <img src="${plantDetails.image}" class="w-full h-52 object-cover">

//     <h2 class="text-2xl font-bold">
//       ${plantDetails.name}
//     </h2>

//     <p>${plantDetails.description}</p>

//     <p class="badge badge-success">
//       ${plantDetails.category}
//     </p>

//     <h2 class="text-xl font-bold text-green-500">
//       $${plantDetails.price}
//     </h2>
//   `;

//   // 5. append করলাম
//   modalContainer.append(div);

//   treeDetailsModal.showModal();
// }


function addToCart(id,name,price){
console.log(id,name,price ,"add to cart");
const existingItem = cart.find(item=>item.id===id)  //2 ta sotti hole if work
// existingItem =
// {
//   id: 1,
//   name: "Mango Tree",
//   quantity: 1
// }
if(existingItem){  //existingItem: mane akhane find ta sotti hole ai condition hobe 
  existingItem.quantity+=1;
  
} 
else{
cart.push({
  id,
  name,
  price,
  quantity:1
});
}

updateCart();
  

}
function updateCart(){
  cartContainer.innerHTML = "";
  
  if(cart.length === 0){
    emptyCartMessage.classList.remove("hidden")
    totalPrice.textContent=`$${0}`
    return
  }
  emptyCartMessage.classList.add("hidden")
// cart = array
// item = single object
  console.log(cart);
  let total = 0;
  cart.forEach((item) =>{
    total+=item.price*item.quantity;
      const cartItem = document.createElement("div");
      cartItem.innerHTML = `<div class="card card-body mb-4 bg-slate-100 ">
        <div class="flex justify-between items-center">
           <div>
             <h2>${item.name}</h2>
             <p>${item.price} x ${item.quantity}</p>
           </div>
            <button class="btn btn-ghost hover:bg-white" onclick="removeFromCart(${item.id})">X</button>
        </div>
        <p class="text-right font-semibold text-xl">${item.price*item.quantity}</p>
    
       
    </div>`
    cartContainer.append(cartItem);
  })
  totalPrice.innerText = `$${total}`;
}
function removeFromCart(treeId){
  console.log(treeId ,"treeId");
const updateCartElements = cart.filter((item) => item.id != treeId);
  console.log(updateCartElements);

  cart = updateCartElements;
    updateCart();   // atake kono vabe bujte pari nai


}
loadTreese();