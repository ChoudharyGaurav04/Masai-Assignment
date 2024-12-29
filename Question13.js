let score=[30,40,32,78,94,56];
let count=0;
for(let i=0;i<score.length;i++){
    if(score[i]<40){
        score[i]+=20;
    }
    if(score[i]>90){
        score[i]=90;
    }
    if(score[i]>=50){
        count++;
    }
}
console.log("Final marks",score)
console.log("Passed student",count)