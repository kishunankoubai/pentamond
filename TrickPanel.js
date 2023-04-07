class TrickPanel{

	block = null;
    trick = null;
	
    constructor(parentId){
		
		this.block = new Array(9);
		
		for(let i = 0; i < 9; i++){
						
			this.block[i] = new Block(parentId + "b" + (i));
			this.block[i].paint();	
			
		}
		
		this.trick = new Trick();
		
	}

    display(ordinal){
		
		let array = this.trick.getArrayByOrdinal(ordinal);
		if(array == null){
			
			for(let i = 0; i < 9; i++){
				
				this.block[i].setShape([false, false, false, true, false, false]);
				this.block[i].paint();
				
			}
						
			return;
			
		}
		
		for(let i  = 0; i < 9; i++){
			
			this.block[i].setShape(array[i]);
			this.block[i].paint();
			
		}
		
		this.trick.setOrdinal(ordinal);
		
	}

    getName(){
		
		return this.trick.getName();
		
	}

    getPoint(){
		
		return this.trick.getPoint();
		
	}

}