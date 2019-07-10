'use strict';
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
let result=[{"name":(iResult[0]).name,"count":0}];
iResult.filter((number)=>{

    let long=result.length;
    for(let i=0;i<long;i++){
       
        if(result[i].name==number.name){
            result[i].count=parseFloat(number.count)+parseFloat(result[i].count);
            break;
        }
         if(i==long-1){
            result.push(number);
        }
    }
});
return result;
    
}

function getReceipt(inputItem){
    let myItem=getItemCount(inputItem);
    let allItem=loadAllItems();
    let result=myItem.map(function(number){
        let iResult=[];
        allItem.filter((InNumber)=>{
            if(number.name==InNumber.barcode)
            iResult.push({"name":number.name,"chinaName":InNumber.name,"count":parseFloat(number.count),"unit":InNumber.unit,"price":InNumber.price,"sumPrice":(parseFloat(number.count*InNumber.price))});
        });
return iResult[0];
    })
    return result;
}

 function getPreferential(inputItem){
     let myItem=getReceipt(inputItem);
     let promotion=(loadPromotions())[0].barcodes;
    let resultItem=myItem.map((number)=>{
        promotion.filter((inNumber)=>{
          if(number.name==inNumber&&number.count>2){
              number.sumPrice=parseFloat((number.count-1)*number.price);
          }
        })
         return number;
     });
     return resultItem;
     }
function printReceipt(inputItem){
    let myReceipt=`***<没钱赚商店>收据***\n`;
    let myItem=getPreferential(inputItem);
    myItem.filter((number)=>{
        myReceipt=`${myReceipt}名称：${number.chinaName}，数量：${number.count}${number.unit}，单价：${(number.price).toFixed(2)}(元)，小计：${(number.sumPrice).toFixed(2)}(元)\n`
    });
    let sum=0;
   let befor=0;
    myItem.filter((number)=>{
        sum+=number.sumPrice;
        befor+=number.count*number.price;

    });
   let lessMoney=befor-sum;
    myReceipt=`${myReceipt}----------------------\n总计：${sum.toFixed(2)}(元)\n节省：${lessMoney.toFixed(2)}(元)\n**********************`;

console.log(myReceipt);

}


