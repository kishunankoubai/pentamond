class Pentiamond{
    
    x = 0;
    y = 0;
    dir = 0;
    kind = 0;

    initialX = 0;
    initialY = 0;

    stop = true;
    fixed = false;
    invalidate = false;
    visible = false;

    mond = null;

    placement =
        
        [
            [ //L
                [[0, 0], [-1, 0], [-2, 0], [1, 0], [1, -1]],
                [[0, 0], [1, 0], [2, 0], [0, -1], [-1, -1]],
                [[0, 0], [1, 0], [1, -1], [0, 1], [1, 1]],
                [[0, 0], [-1, 0], [-1, 1], [1, 0], [2, 0]],
                [[0, 0], [-1, 0], [-2, 0], [0, 1], [1, 1]],
                [[0, 0], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
            ],[ //J
                [[0, 0], [-1, 0], [-1, -1], [1, 0], [2, 0]],
                [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1]],
                [[0, 0], [0, 1], [-1, 1], [1, 0], [2, 0]],
                [[0, 0], [-1, 0], [-2, 0], [1, 0], [1, 1]],
                [[0, 0], [-1, 0], [-1, -1], [0, 1], [-1, 1]],
                [[0, 0], [-1, -0], [-2, -0], [0, -1], [1, -1]],
            ],[ //p
                [[0, -1], [0, 0], [1, 0], [2, 0], [-1, 0]],
                [[-1, 0], [0, 0], [0, 1], [1, 1], [1, 0]],
                [[0, -1], [0, 0], [1, 0], [-1, 1], [-1, 0]],
                [[1, 0], [0, 0], [-1, 0], [-2, 0], [0, 1]],
                [[-1, 0], [0, 0], [1, 0], [-1, -1], [0, -1]],
                [[0, 1], [0, 0], [-1, 0], [1, -1], [1, 0]],
            ],[ //q
                [[0, -1], [0, 0], [1, 0], [-2, 0], [-1, 0]],
                [[0, 1], [0, 0], [1, 0], [-1, -1], [-1, 0]],
                [[-1, 0], [0, 0], [1, 0], [1, -1], [0, -1]],
                [[-1, 0], [0, 0], [1, 0], [2, 0], [0, 1]],
                [[0, -1], [0, 0], [-1, 0], [1, 1], [1, 0]],
                [[-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1]],
            ],[ //U
                [[0, 0], [1, 0], [1, -1], [-1, 0], [-1, -1]],
                [[0, 0], [1, 0], [2, 0], [0, -1], [1, -1]],
                [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]],
                [[0, 0], [1, 0], [1, 1], [-1, 0], [-1, 1]],
                [[0, 0], [-1, 0], [-2, 0], [0, 1], [-1, 1]],
                [[0, 0], [-1, 0], [-2, 0], [0, -1], [-1, -1]],
            ],[ //I
                [[0, 0], [1, 0], [2, 0], [-1, 0], [-2, 0]],
                [[0, 0], [1, 0], [1, 1], [0, -1], [-1, -1]],
                [[0, 0], [1, 0], [1, -1], [0, 1], [-1, 1]],
                [[0, 0], [1, 0], [2, 0], [-1, 0], [-2, 0]],
                [[0, 0], [0, 1], [1, 1], [-1, 0], [-1, -1]],
                [[0, 0], [0, -1], [1, -1], [-1, 0], [-1, 1]],
            ]
        ];

    constructor(c){
        
        this.initialX = c.initialX;
        this.initialY = c.initialY;
        this.mond = new Array(5);
        for(let i = 0; i < 5; i++){
            
            this.mond[i] = new Monoiamond(c);
            
        }
		        
    }

    initialize(){
        
        //console.log("Pentiamond:initialize");
        
        this.x = this.initialX;
        this.y = this.initialY;
        this.dir = 0;
        
        if(!this.canPut(this.x, this.y, this.dir, this.kind)){
            
            this.stop = true;
            
        }
        
    }

    canPut(x, y, dir, kind){
                
        let result = true;
        
        for(let i = 0; i < 5; i++){
            
            result = result && this.mond[i].canPut(x + this.placement[kind - 1][dir][i][0], y + this.placement[kind - 1][dir][i][1], ((dir + i) % 2 == 0));
			//console.log((x + this.placement[kind - 1][dir][i][0]) + ", " + (y + this.placement[kind - 1][dir][i][1]) + ", " + ((dir + i) % 2 == 0) + "=>" + result);
            
        }
        
        return result;
        
    }

    display(){
                
        if(this.visible || this.fixed || this.invalidate || !this.canPut(this.x, this.y, this.dir, this.kind)){
            
            //console.log("Pentiamond:display:fail");
            return;
            
        }
        
        for(let i = 0; i < 5; i++){
            
            this.mond[i].setProperty(this.x + this.placement[this.kind - 1][this.dir][i][0], this.y + this.placement[this.kind - 1][this.dir][i][1], ((this.dir + i) % 2 == 0), this.kind);
            this.mond[i].display();
            
        }
        
        //console.log("Pentiamond:display:success");
        
        this.stop = false;
        this.visible = true;
        
    }

    remove(){
        
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            //console.log("Pentiamond:remove:fail");
            return;
            
        }
        
        for(let i = 0; i < 5; i++){
            
            this.mond[i].remove();
            
        }
        
        //console.log("Pentiamond:remove:success");
        this.visible = false;
        
    }

    move(x, y){
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return false;
            
        }
        
        this.remove();
        
        if(this.canPut(this.x + x, this.y + y, this.dir, this.kind)){
            
            this.x += x;
            this.y += y;
			this.display();
			return true;
            
        }else{
			
			this.display();
			return false;
			
		}
                
    }

    fall(){
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return;
            
        }
        
        if(!this.move(0, 1)){
            
            if(!this.move(-1, 1)){
                
                if(!this.move(1, 1));
                
            }
            
        }
        
    }

    put(){
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return;
            
        }
        
        while(this.move(0, 1));
        this.fixed = true;
        
    }

    spin(dir){
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return;
            
        }
        
        this.remove();
        
        if(this.canPut(this.x, this.y, ((this.dir + dir) % 6 + 6) % 6, this.kind)){
            
            this.dir = ((this.dir + dir) % 6 + 6) % 6;
            
        }
        
        this.display();  
        
    }

    setInvalidate(invalidate){
        
        this.invalidate = invalidate;
        
    }

    setKind(kind){
        
        if(this.visible){
            
            return;
            
        }
        
        this.kind = kind;
        
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
        
        if(!this.visible || this.stop || !this.fixed || this.invalidate){
            
            return;
            
        }
		        
        for(let i = 0; i < 5; i++){
            
            this.mond[i].turnToGhost();
            
        }
        
    }

}