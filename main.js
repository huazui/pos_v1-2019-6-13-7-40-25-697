'use strict';
const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ]
function getItemCount(inputItem){
    let iResult=[];
   
    inputItem.filter((number)=>{
        let tag=number.indexOf('-');
        if(tag>0){
            iResult.push({"name":(number.slice(0,tag)),"count":(number.slice(tag+1))});
        }
        else {iResult.push({"name":number,"count":1});
    }
});
        
    
}

function getReceipt(inputItem){
    let myItem=getItemCount(inputItem);
    let allItem=loadAllItems();
    let result=imyItem.map(function(number){
        let iResult=[];
        allItem.filter((InNumber)=>{
            if(number[name]==InNumber.barcode)
            iResult.push({"name":number.name,"count":number.count,"unit":InNumber.unit,"price":InNumber.price,"sumPrice":(number.count*InNumber.price).toFixed(2)});
        });
return iResult;
    })
    return result;
}

 function getPreferential(inputItem){
     let myItem=getReceipt(inputItem);
     let promotion=loadPromotions();
     myItem.map((number)=>{
         if(number.name in promotion.barcode){
            if(number.count>2){
                number.count++;
            }

         }
         return number;
     });
     return myItem;
     }
function printReceipt(inputItem){
    let myReceipt=`***<没钱赚商店>收据***\n`;
    myItem=getPreferential(inputItem);
    myItem.filter((number)=>{
        myReceipt=`${myReceipt}名称：${number}，数量：${number.count}${number.unit}，单价：${number.price}(元)，小计：${number.sumPrice}\n`
    });
    let sum=0;
   let befor=0;
    myItem.filter((number)=>{
        sum+=number.sumPrice;
        befor+=number.count*number.price;

    });
   let lessMoney=bdfor-sum;
    myReceipt=`${myReceipt}----------------------\n总计：${sum.toFixed(2)}(元)\n节省：${less.toFixed(2)}(元)`;

return myReceipt;

}


