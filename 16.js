

BMICalculator(70,1.75)
BMICalculator(55,1.60)
BMICalculator(90,1.80)
function BMICalculator(Weight,Height){
    if(Height<0 || Weight<0){
        console.log("Invalid input, height and weight must be positive numbers.")
    }
    else if(Height==0){
        console.log("Invalid input, height cannot be zero.")
    }
    else if(Weight==0){
        console.log("Invalid input, weight cannot be zero")
    }
    else{
    let BMI=Weight/(Height*Height);
    console.log("Your BMI is: "+BMI.toFixed(2))
    }
}

