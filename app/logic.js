
  let isFinish = false;
  let boomType = prompt('Enter what you want to use as boom')
  let bigRes = 0;
  
  while (isFinish != true) {
    let wallType = prompt('Put the type of walls you want to raid')
    let wallQuantity = parseInt(prompt('Put the quantity of walls you want to raid'))
  
    if (Damage[boomType][wallType] && !isNaN(wallQuantity)) {
      const boomPower = getSimpleBoomPower(boomType, wallType);
      let micRes = calculatePowerOfCuantity(wallQuantity, boomPower);
      bigRes += micRes
    }
    else {
      confirm("Invalid input. Please enter valid boom type, wall type, and wall quantity.");
    }
    let isDone = prompt("Are you done?y/n")
    if (isDone == "y"){
      isFinish = true
    }
  }
  
  confirm(`You need ${bigRes} ${boomType} to raid walls.`)
  
  function getSimpleBoomPower(boomType, wallType) {
    return (Damage[boomType][wallType])
  }
  function calculatePowerOfCuantity(wallQuantity, boomPower) {
    return (wallQuantity * boomPower)
  }