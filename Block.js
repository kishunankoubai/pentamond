class Block{
    
    element = null;
    ct = null;
    
    width = 0;
    height = 0;

    lef = false;
    mid = false;
    rig = false;

    lefDir = false;
    midDir = true;
    rigDir = false;

    lefG = false;
    midG = false;
    rigG = false;

    lefDirG = false;
    midDirG = true;
    rigDirG = false;

    lefKind = 0;
    midKind = 0;
    rigKind = 0;

    borderCor = "#888888";
    borderWidth = 8;

    borderCorG = "#444444";

    grid = true;
    gridCor = "#444444";
    gridWidth = 16;

    constructor(id){
        
        this.element = document.getElementById(id);
        this.ct = this.element.getContext("2d");
        this.height = this.element.height;
        this.width = this.element.width;
        
    }

    color(kind){
        
        return kind == 1 ? "#FF0000"
        : kind == 2 ? "#FA7800"
        : kind == 3 ? "#FFFF00"
        : kind == 4 ? "#00FF00"
        : kind == 5 ? "#0000FF"
        : kind == 6 ? "#880088"
        
        : kind == 7 ? "#440000"
        : kind == 8 ? "#3E1E00"
        : kind == 9 ? "#444400"
        : kind == 10 ? "#004400"
        : kind == 11 ? "#000044"
        : kind == 12 ? "#220022"
        : "#AAAAAA";
        
    }

    display(place, dir, kind){
		
		if(!this.canPut(place, dir)){
			
			return;
			
		}
        
        switch(place){
                
            case 0:
                    
                this.lef = true;
                this.lefDir = dir;
                this.lefKind = kind;
                break;
                
            case 1:
                         
                this.mid = true;
                this.midDir = dir;
                this.midKind = kind;
                break;
                
            case 2:
                                
                this.rig = true;
                this.rigDir = dir;
                this.rigKind = kind;
                break;
                
        }
        
    }

    canPut(place, dir){
        
        switch(place){
               
            case 0:
                
                if(this.lef || (dir == this.midDir) && this.mid){
                    
                    return false;
                    
                }
                break;
                
            case 1:
                
                if(this.mid || (dir == this.lefDir) && this.lef || (dir == this.rigDir) && this.rig){
                    
                    return false;
                    
                }
                break;
                
            case 2:
                
                if(this.rig || (dir == this.midDir) && this.mid){
                    
                    return false;
                    
                }
                break;
               
        }
        
        return true;
        
    }

    remove(place){
        
        switch(place){
                
            case 0:
                                
                this.lef = false;
                break;
                
            case 1:
                
                this.mid = false;
                break;
                
            case 2:
                
                this.rig = false;
                break;
                
        }
                
    }

    turnToGhost(place){
        
        switch(place){
                
            case 0:
                       
                if(!this.lef){
                    
                    return;
                    
                }
                
                this.lef = false;
                this.lefDirG = this.lefDir;
                this.lefG = true;
                break;
                
            case 1:
                
                if(!this.mid){
                    
                    return;
                    
                }
                
                this.mid = false;
                this.midDirG = this.midDir;
                this.midG = true;
                break;
                
            case 2:
                
                if(!this.rig){
                    
                    return;
                    
                }
                
                this.rig = false;
                this.rigDirG = this.rigDir;
                this.rigG = true;
                break;
                
        }
        
    }

    resetGhost(){
        
        this.lefG = false;
        this.midG = false;
        this.rigG = false;
        
    }

    setKind(lefKind, midKind, rigKind){
		
		this.lefKind = lefKind;
		this.midKind = midKind;
		this.rigKind = rigKind;
		
	}

    resetKind(){
		
		this.lefKind = 0;
		this.midKind = 0;
		this.rigKind = 0;
		
	}

    getShape(){
		
		return [this.lef, this.lefDir, this.mid, this.midDir, this.rig, this.rigDir];
		
	}

    setShape(shape){
		
		this.lef = shape[0];
		this.lefDir = shape[1];
		this.lefKind = 0;
		this.mid = shape[2];
		this.midDir = shape[3];
		this.midKind = 0;
		this.rig = shape[4];
		this.rigDir = shape[5];
		this.rigKind = 0;
		
	}

    paint(){
        
        this.ct.clearRect(0, 0, this.width, this.height);
        
        if(this.grid){
            
            this.ct.beginPath();
            this.ct.strokeStyle = this.gridCor;
            this.ct.lineWidth = this.gridWidth;
            this.ct.moveTo(0, 0);
            this.ct.lineTo(0, this.width);
            this.ct.stroke();
            
            this.ct.beginPath();
            this.ct.moveTo(this.width, 0);
            this.ct.lineTo(this.width, this.height);
            this.ct.stroke();
            
        }
        
        if(this.lefG){
            
            if(this.lefDirG){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.lefKind + 6);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(0, this.height);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(0, this.height);
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.lefKind + 6);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(0, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(0, this.height);
                this.ct.stroke();                
            }
            
        }
            
        if(this.midG){
            
            if(this.midDirG){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.midKind + 6);
                this.ct.moveTo(0, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.closePath();
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.midKind + 6);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.closePath();
                this.ct.stroke();                
            }
            
        }
            
        if(this.rigG){
            
            if(this.rigDirG){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.rigKind + 6);
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.rigKind + 6);
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(this.width, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCorG;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(this.width, this.height);
                this.ct.stroke();                
            }
            
        }
        
        
        if(this.lef){
            
            if(this.lefDir){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.lefKind);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(0, this.height);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(0, this.height);
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.lefKind);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(0, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(0, this.height);
                this.ct.stroke();                
            }
            
        }
            
        if(this.mid){
            
            if(this.midDir){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.midKind);
                this.ct.moveTo(0, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.closePath();
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.midKind);
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(0, 0);
                this.ct.lineTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.closePath();
                this.ct.stroke();                
            }
            
        }
            
        if(this.rig){
            
            if(this.rigDir){
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.rigKind);
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, this.height);
                this.ct.lineTo(this.width, this.height);
                this.ct.stroke();
                
            }else{
                
                this.ct.beginPath();
                this.ct.fillStyle = this.color(this.rigKind);
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(this.width, this.height);
                this.ct.fill();
                
                this.ct.beginPath();
                this.ct.strokeStyle = this.borderCor;
                this.ct.lineWidth = this.borderWidth;
                this.ct.moveTo(this.width, 0);
                this.ct.lineTo(this.width / 2, 0);
                this.ct.lineTo(this.width, this.height);
                this.ct.stroke();                
            }
            
        }
        
    }

}