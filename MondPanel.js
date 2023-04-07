class MondPanel{

	block = null;
    initialX = 2;
    initialY = 2;
    width = 3;
    height = 3;
    hHeight = 0;
    pentiamond = null;
	
    constructor(parentId){
		
		this.block = new Array(this.width);
		
		for(let i = 0; i < this.width; i++){
			
			this.block[i] = new Array(this.height);
			
			for(let j = 0; j < this.height; j++){
				
				this.block[i][j] = new Block(parentId + "b" + (i + this.width * j));
				this.block[i][j].grid = false;
				
			}
			
		}
		
		this.pentiamond = new Pentiamond(this);
		this.pentiamond.setKind(1);
		this.pentiamond.initialize();
		
	}

    display(kind){
		
		if(kind == 0){
			
			this.pentiamond.remove();
			return;
			
		}
		
		this.pentiamond.remove();
		this.pentiamond.setKind(kind);
		this.pentiamond.display();
		
	}

}