~ function () {
   var pItem = document.querySelectorAll("#leftNav p");
   var pImg = document.querySelectorAll("#leftNav img");
   var pClass = document.querySelectorAll("#leftNav ol");

   for(var i = 0;i<pItem.length;i++){
       pItem[i].tag = false;
       pItem[i].index = i;
       pItem[i].onclick = function(){
          if(this.tag == true){
              pClass[this.index].style.display = "block";
              pImg[this.index].src = "../img/userSet/ico2.gif";
              
          }else{
            pClass[this.index].style.display = "none";
            pImg[this.index].src = "../img/userSet/ico1.gif";
          }
          this.tag = !this.tag;
       }

   }











}();