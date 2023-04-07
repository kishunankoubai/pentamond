class Trick{

    ordinal = null;
    number = 0;

    constructor(){
		
		let number = 0;
		
		while(true){
			
			if(this.getArrayByOrdinal(number) == null){
				
				break;
				
			}
			
			number++;
			
		}
		
		this.number = number;
		
	}

    getArrayByOrdinal(ordinal){
		
		switch(ordinal){
				
			case 0:
				
				return [
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
				];
				
			case 1:
				
				return [
					[false, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, true, true],
					[true, true, true, false, false, true],
				];
				
			case 2:
				
				return [
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
				];
				
			case 3:
				
				return [
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
					[false, true, true, false, false, true],
				];
				
			case 4:
				
				return [
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, true, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
				];
				
			case 5:
				
				return [
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, true, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
					[false, false, false, true, false, false],
				];
				
			case 6:
				
				return [
					[false, true, true, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, false, false, false, true],
					[false, true, true, false, false, true],
				];
				
			case 7:
				
				return [
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
					[false, false, false, true, false, false],
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
				];
				
			case 8:
				
				return [
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
					[false, false, true, true, true, false],
					[true, false, true, true, true, false],
					[true, false, true, true, false, false],
				];
				
			case 9:
				
				return [
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
				];
				
			case 10:
				
				return [
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
					[false, false, true, true, false, false],
					[false, false, true, false, false, false],
				];
				
		}
		
		return null;
		
	}

    getArray(){
		
		return this.getArrayByOrdinal(this.ordinal);
		
	}

    setOrdinalByArray(array){
		
		for(let i = 0; i < this.number; i++){
			
			if(this.isTheSame(this.getArrayByOrdinal(i), array)){
				
				this.ordinal = i;
				return i;
				
			}
			
		}
		
		this.ordinal = null;
		return null;
		
	}

    setOrdinal(ordinal){
		
		this.ordinal = ordinal;
		
	}

    getOrdinal(){
		
		return this.ordinal;
		
	}

    isTheSame(array1, array2){
		
		for(let i = 0; i < 9; i++){
			
			if(array1[i][0] == array2[i][0] && array1[i][2] == array2[i][2] && array1[i][4] == array2[i][4]){
				
				if(array1[i][0] && (array1[i][1] != array2[i][1]) || array1[i][2] && (array1[i][3] != array2[i][3]) || array1[i][4] && (array1[i][5] != array2[i][5])){
					
					return false;
					
				}
				
			}else{
				
				return false;
				
			}
			
		}
		
		return true;
		
	}

    getPointByOrdinal(ordinal){
		
		return ordinal == 0 ? 10
		: ordinal == 1 ? 10
		: ordinal == 2 ? 60
		: ordinal == 3 ? 50
		: ordinal == 4 ? 1
		: ordinal == 5 ? 5
		: ordinal == 6 ? 5
		: ordinal == 7 ? 15
		: ordinal == 8 ? 20
		: ordinal == 9 ? 80
		: ordinal == 10 ? 80
		: 0;
		
	}

    getPoint(){
		
		return this.getPointByOrdinal(this.ordinal);
		
	}

    getNameByOrdinal(ordinal){
		
		return ordinal == 0 ? "一列揃え(上)"
		: ordinal == 1 ? "一列揃え(下)"
		: ordinal == 2 ? "ギザギザ"
		: ordinal == 3 ? "トゲトゲ"
		: ordinal == 4 ? "雀の涙"
		: ordinal == 5 ? "王冠"
		: ordinal == 6 ? "柱"
		: ordinal == 7 ? "クマの耳"
		: ordinal == 8 ? "三つ子山"
		: ordinal == 9 ? "牙(上)"
		: ordinal == 10 ? "牙(下)"
		: "";
		
	}

    getName(){
		
		return this.getNameByOrdinal(this.ordinal);
		
	}

    getRandomOrdinal(){
		
		return Math.floor(Math.random() * this.number);
		
	}


}