class Monoiamond{
    
    block = null;
    width = 1;
    height = 1;

    x = 1; //0 ~ width * 2 - 2
    y = 20;
    kind = 0;
    dir = true;
    visible = false;
    
    constructor(c){
        
        this.block = c.block;
        this.width = c.width;
        this.height = c.height + c.hHeight;
        
    }

    canPut(x, y, dir){
        
        if(x < 0 || this.width * 2 - 1 <= x || y < 0 || this.height <= y){
           
           return false;
            
        }
        
        let result = true;
        
        if(x % 2 == 0){
            
            result =this.block[x / 2][y].canPut(1, dir);
            
        }else{
            
            result = result && this.block[(x - 1) / 2][y].canPut(2, dir);
            result = result && this.block[(x + 1) / 2][y].canPut(0, dir);
            
        }
        
        return result;
        
    }

    display(){
        
        if(this.visible || !this.canPut(this.x, this.y, this.dir)){
            
            return;
            
        }
        
        if(this.x % 2 == 0){
            
            this.block[this.x / 2][this.y].display(1, this.dir, this.kind);
            this.block[this.x / 2][this.y].paint();
            
        }else{
            
            this.block[(this.x - 1) / 2][this.y].display(2, this.dir, this.kind);
            this.block[(this.x + 1) / 2][this.y].display(0, this.dir, this.kind);
            this.block[(this.x - 1) / 2][this.y].paint();
            this.block[(this.x + 1) / 2][this.y].paint();
            
        }

        this.visible = true;
        
    }

    remove(){
        
        if(!this.visible){
            
            return;
            
        }
        
        if(this.x % 2 == 0){
            
            this.block[this.x / 2][this.y].remove(1);
            this.block[this.x / 2][this.y].paint();
            
        }else{
            
            this.block[(this.x - 1) / 2][this.y].remove(2);
            this.block[(this.x + 1) / 2][this.y].remove(0);
            this.block[(this.x - 1) / 2][this.y].paint();
            this.block[(this.x + 1) / 2][this.y].paint();
            
        }
        
        this.visible = false;
        
    }

    setProperty(x, y, dir, kind){
        
        if(this.visible){
        
            this.remove();
            this.x = x;
            this.y = y;
            this.dir = dir;
            this.kind = kind;
            this.display();
            
        }else{
            
            this.x = x;
            this.y = y;
            this.dir = dir;
            this.kind = kind;
            
        }
        
    }

    turnToGhost(){
        
        if(!this.visible){
            
            return;
            
        }
        
        if(this.x % 2 == 0){
            
            this.block[this.x / 2][this.y].turnToGhost(1);
            this.block[this.x / 2][this.y].paint();
            
        }else{
            
            this.block[(this.x - 1) / 2][this.y].turnToGhost(2);
            this.block[(this.x + 1) / 2][this.y].turnToGhost(0);
            this.block[(this.x - 1) / 2][this.y].paint();
            this.block[(this.x + 1) / 2][this.y].paint();
            
        }
        
    }
    
}