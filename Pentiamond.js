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

    //回転に伴う軸の補正 壁際などでの感覚的な回転を可能にする
    correction =
        
        [
            [ //L
                [ //右回転
                    [[0, 0], [-1, 0]], //0 > 1
                    [[0, 0], [0, -1]], //1 > 2
                    [[0, 0], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]], //2 > 3
                    [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1]], //3 > 4
                    [[0, 0], [1, 0]], //4 > 5
                    [[0, 0], [-1, 0], [1, 0], [-1, -1], [0, -1]], //5 > 0
               ],[ //左回転
                    [[0, 0], [0, -1]], //0 > 5
                    [[0, 0], [1, 0], [1, -1], [2, -1]], //1 > 0
                    [[0, 0], [1, 0], [-1, 0], [1, -1]], //2 > 1
                    [[0, 0], [-1, 0], [0, -1]], //3 > 2
                    [[0, 0], [-1, 0], [0, -1], [-1, -1]], //4 > 3
                    [[0, 0], [1, 0], [-1, 0], [-1, -1], [1, -1], [-2, -1], [0, -2]], //5 > 4
                ]
            ],[ //J
                [ //右回転
                    [[0, 0], [0, -1]], //0 > 1
                    [[0, 0], [-1, 0], [1, 0], [1, -1], [-1, -1], [2, -1], [0, -2]], //1 > 2
                    [[0, 0], [1, 0], [0, -1], [1, -1]], //2 > 3
                    [[0, 0], [1, 0], [0, -1]], //3 > 4
                    [[0, 0], [-1, 0], [1, 0], [-1, -1]], //4 > 5
                    [[0, 0], [-1, 0], [-1, -1], [-2, -1]], //5 > 0
               ],[ //左回転
                    [[0, 0], [1, 0]], //0 > 5
                    [[0, 0], [1, 0], [-1, 0], [1, -1], [0, -1]], //1 > 0
                    [[0, 0], [-1, 0]], //2 > 1
                    [[0, 0], [-1, 0], [1, 0], [0, -1], [-1, -1]], //3 > 2
                    [[0, 0], [1, 0], [-1, 0], [1, -1], [0, -1], [-1, -1]], //4 > 3
                    [[0, 0], [0, -1]], //5 > 4
                ]
            ],[ //p
                [ //右回転
                    [[0, 0], [0, -1]], //0 > 1
                    [[0, 0], [1, 0], [0, -1]], //1 > 2
                    [[0, 0], [1, 0], [0, -1], [1, -1]], //2 > 3
                    [[0, 0], [-1, 0]], //3 > 4
                    [[0, 0], [0, -1]], //4 > 5
                    [[0, 0], [-1, 0], [1, 0], [0, -1]], //5 > 0
               ],[ //左回転
                    [[0, 0], [0, -1]], //0 > 5
                    [[0, 0], [-1, 0], [1, 0], [0, -1]], //1 > 0
                    [[0, 0], [0, -1]], //2 > 1
                    [[0, 0], [0, -1]], //3 > 2
                    [[0, 0], [1, 0], [0, -1], [1, -1], [2, -1], [1, -2]], //4 > 3
                    [[0, 0], [1, 0], [-1, 0], [0, -1]], //5 > 4
                ]
            ],[ //q
                [ //右回転
                    [[0, 0], [0, -1]], //0 > 1
                    [[0, 0], [-1, 0], [1, 0], [0, -1]], //1 > 2
                    [[0, 0], [-1, 0], [0, -1], [-1, -1], [-2, -1], [-1, -2]], //2 > 3
                    [[0, 0], [0, -1]], //3 > 4
                    [[0, 0], [0, -1]], //4 > 5
                    [[0, 0], [1, 0], [-1, 0], [0, -1]], //5 > 0
               ],[ //左回転
                    [[0, 0], [0, -1]], //0 > 5
                    [[0, 0], [1, 0], [-1, 0], [0, -1]], //1 > 0
                    [[0, 0], [0, -1]], //2 > 1
                    [[0, 0], [1, 0]], //3 > 2
                    [[0, 0], [-1, 0], [0, -1], [-1, -1]], //4 > 3
                    [[0, 0], [-1, 0], [0, -1]], //5 > 4
                ]
            ],[ //U
                [ //右回転
                    [[0, 0], [-1, 0]], //0 > 1
                    [[0, 0], [0, -1]], //1 > 2
                    [[0, 0], [1, 0], [0, -1]], //2 > 3
                    [[0, 0], [1, 0], [0, -1], [1, -1]], //3 > 4
                    [[0, 0], [0, 1]], //4 > 5
                    [[0, 0], [-1, 0]], //5 > 0
               ],[ //左回転
                    [[0, 0], [1, 0]], //0 > 5
                    [[0, 0], [1, 0]], //1 > 0
                    [[0, 0], [0, 1]], //2 > 1
                    [[0, 0], [-1, 0], [0, -1], [-1 ,-1]], //3 > 2
                    [[0, 0], [-1, 0], [0, -1]], //4 > 3
                    [[0, 0], [0, -1]], //5 > 4
                ]
            ],[ //I
                [ //右回転
                    [[0, 0], [0, -1]], //0 > 1
                    [[0, 0], [0, -1], [1, -1], [2, -1]], //1 > 2
                    [[0, 0], [-1, 0], [1, 0], [0, -1], [-1, -1], [1, -1]], //2 > 3
                    [[0, 0], [0, -1]], //3 > 4
                    [[0, 0], [1, 0], [0, -1]], //4 > 5
                    [[0, 0], [-1, 0], [1, 0], [-2, 0], [-3, 0], [-2, -1], [0, -1], [1, -1]], //5 > 0
               ],[ //左回転
                    [[0, 0], [0, -1]], //0 > 5
                    [[0, 0], [1, 0], [-1, 0], [2, 0], [3, 0], [2, -1], [0, -1], [-1, -1]], //1 > 0
                    [[0, 0], [-1, 0], [0, -1]], //2 > 1
                    [[0, 0], [0, -1]], //3 > 2
                    [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [-1, -1]], //4 > 3
                    [[0, 0], [0, -1], [-1, -1], [-2, -1]], //5 > 4
                ]
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

    //表示されていないPentiamondを出現させる
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

    //表示されているPentiamondを削除する
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

    //地面につくまで真下に移動し、そのあとこのPentiamondを固定する
    put(){
        
        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return;
            
        }
        
        while(this.move(0, 1));
        this.fixed = true;
        
    }

    //表示されたPentiamondを回転する
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

    //スーパーローテーションシステムによる回転を行う
    //correctionによる軸の補正を行った後の回転を順に試し、最初に成功したものを実際に実行する
    SRS(right){

        if(!this.visible || this.stop || this.fixed || this.invalidate){
            
            return;
            
        }

        this.remove();
        
        for(let i = 0; i < this.correction[this.kind - 1][right ? 0 : 1][this.dir].length; i++){
            if(this.canPut(this.x + this.correction[this.kind - 1][right ? 0 : 1][this.dir][i][0], this.y + this.correction[this.kind - 1][right ? 0 : 1][this.dir][i][1], ((this.dir + (right ? 1 : -1)) % 6 + 6) % 6, this.kind)){
                this.x += this.correction[this.kind - 1][right ? 0 : 1][this.dir][i][0];
                this.y += this.correction[this.kind - 1][right ? 0 : 1][this.dir][i][1];
                this.dir = ((this.dir + (right ? 1 : -1)) % 6 + 6) % 6;
                break;
            }
        }            
        this.display();  


    }

    //pentiamondに対する操作を無効化するかどうかを設定する
    setInvalidate(invalidate){
        
        this.invalidate = invalidate;
        
    }

    //表示されていないPentiamondのkindを設定する
    setKind(kind){
        
        if(this.visible){
            
            return;
            
        }
        
        this.kind = kind;
        
    }

    //Pentiamondのプロパティを設定する　要修正の可能性あり
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

    //すでにあるPentiamondを捕捉する
    catch(x, y, dir, kind){

        if(this.invalidate){
            return;
        }

        for(let i = 0; i < 5; i++){
            if(this.mond[0].canPut(x + this.placement[kind - 1][dir][i][0], y + this.placement[kind - 1][dir][i][1], ((dir + i) % 2 == 0))){
                return;
            }
        }

        this.visible = false;
        this.setProperty(x, y, dir, kind);
        for(let i = 0; i < 5; i++){
            
            this.mond[i].setProperty(this.x + this.placement[this.kind - 1][this.dir][i][0], this.y + this.placement[this.kind - 1][this.dir][i][1], ((this.dir + i) % 2 == 0), this.kind);
            this.mond[i].visible = true;
            
        }

        this.stop = false;
        this.fixed = false; 
        this.visible = true;

	}

    //表示されたPentiamondをゴースト化する
    turnToGhost(){
        
        if(!this.visible || this.stop || !this.fixed || this.invalidate){
            
            return;
            
        }
		        
        for(let i = 0; i < 5; i++){
            
            this.mond[i].turnToGhost();
            
        }
        
    }

}