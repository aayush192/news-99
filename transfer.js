let search='health';
let url='';
const date=new Date();

 async function geturl(search){
url=`https://newsapi.org/v2/everything?q=${search}&apiKey=270f73a6471e4091befa92f31a39bb2a`;

let content=[];
try{
    const res= await fetch(url);
    const result=await res.json();
    content=result.articles.map((val)=>{
         return val;
    })
} catch(error){
    console.log(error);
}
    console.log(content);
    let html='';
    content.forEach(element => {
        if(element.content!="[Removed]" && element.urlToImage!=null){

      html+=`<div class="box">
      <div class="item-detail">
      <div class="img">
      <div class='img-detail'>
      <img src='${element.urlToImage}' loading='lazy'>
      </div>
      </div>
    <div class="author">${author(element)}</div>
     <div class="title">${element.title}</div>
     <div class='content'>${element.content.slice(0,60)}..</div>
    <div class="detail">${discription(element.description)}..</div>
    <a href='${element.url}' target='_blank'><button class='More'>more..</button></a>
    </div></div>`
        }
    });
    document.querySelector('.boxes').innerHTML=html;


 }

geturl(search);
function discription(element){
if(element!==null){
    return element.slice(0,200);
}
else{
    return '';
}
}
function author(element){
    return`${element.source.name}<br>
    ${element.publishedAt}`;
}

const searchButton=document.querySelector('.search-button');
const searchBar=document.querySelector('.search-bar');
const option=document.querySelectorAll('.option');

option.forEach(button=>{
button.addEventListener('click',(event)=>{
 search=event.target.dataset.nameSearch;
 geturl(search);
})
})


searchButton.addEventListener('click',()=>{
    search=searchBar.value;
    geturl(search);
})