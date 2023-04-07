class Control{

    height = 20;
    width = 9;
    hHeight = 16;
    gridH = (window.innerHeight) / (this.height + 1);
    gridW = Math.floor(this.gridH * 2 / Math.sqrt(3));
    initialX = this.width - 1;
    initialY = this.hHeight + 1;
    initialTime = 300;
    timeRate = 500;
    block = null;
    page = 0;
    buttonTra = "all 300ms ease 0s";
    next = 4;
    nextPanel = null;
    nextSize = 0.7;
    holdPanel = null;
    holdSize = 1.0;
    trickPanel = null;
    trickList = null;
    trickOrdinal = 0;
            
    constructor(){
        
        
        
    }

    setElement(){
        
        let blockBase = document.getElementById("blockBase");
        this.block = new Array(this.width);
        
        for(let i = 0; i < this.width; i++){
            
            this.block[i] = new Array(this.height + this.hHeight);
                
            for(let j = 0; j < this.height + this.hHeight; j++){
                    
                let block = document.createElement("canvas");
                block.className = "block";
                block.id = "b" + (i + this.width * j);
                block.style.top = ((j - this.hHeight) * this.gridH) + "px";
                block.style.left = (i * this.gridW) + "px";
                blockBase.appendChild(block);
                this.block[i][j] = new Block("b" + (i + this.width * j));
                
            }
                
        }
		
		let info = document.getElementById("info");
		
        let holdPanel = document.createElement("div");
        holdPanel.id = "hp";
		holdPanel.className = "mondPanel";
		holdPanel.style.width = ((this.gridW * this.holdSize) * 4) + "px";
		holdPanel.style.height = ((this.gridH * this.holdSize) * 4) + "px";
		holdPanel.style.top = 0 + "px";
		holdPanel.style.left = (this.gridW * (this.width + 2) + 11) + "px";
		document.getElementsByTagName("body")[0].insertBefore(holdPanel, document.getElementById("info").nextSibling);
			
		let holdBase = document.createElement("div");
		holdBase.id = "hb";
		holdBase.style.width = ((this.gridW * this.holdSize) * 3) + "px";
		holdBase.style.height = ((this.gridH * this.holdSize) * 3) + "px";
		holdBase.style.top = (this.gridH * this.holdSize / 2) + "px";
		holdBase.style.left = (this.gridW * this.holdSize / 2) + "px";
		holdPanel.appendChild(holdBase);
			
		for(let j = 0; j < 3; j++){
				
			for(let k = 0; k < 3; k++){
					
				let block = document.createElement("canvas");
				block.className = "block";
				block.id = "hp" + "b" + (j + 3 * k);
				block.style.width = (this.gridW * this.holdSize) + "px";
				block.style.height = (this.gridH * this.holdSize) + "px";
				block.style.top = (k * this.gridH * this.holdSize - k * 0.1) + "px";
				block.style.left = (j * this.gridW * this.holdSize) + "px";
				holdBase.appendChild(block);
					
			}
				
		}
			
		this.holdPanel = new MondPanel("hp");
		
		this.nextPanel = new Array(this.next);

		for(let i = 0; i < this.next; i++){
			
            let nextPanel = document.createElement("div");
			nextPanel.id = "np" + i;
			nextPanel.className = "mondPanel";
			nextPanel.style.width = ((this.gridW * this.nextSize) * 4) + "px";
			nextPanel.style.height = ((this.gridH * this.nextSize) * 4) + "px";
			nextPanel.style.top = (this.gridH * this.nextSize * 4 * i + this.gridH * this.holdSize * 4 + 4 + i * 3) + "px";
			nextPanel.style.left = (this.gridW * (this.width + 2) + 11) + "px";
            document.getElementsByTagName("body")[0].insertBefore(nextPanel, document.getElementById("info").nextSibling);
			
			let nextBase = document.createElement("div");
			nextBase.id = "nb" + i;
			nextBase.style.width = ((this.gridW * this.nextSize) * 3) + "px";
			nextBase.style.height = ((this.gridH * this.nextSize) * 3) + "px";
			nextBase.style.top = (this.gridH * this.nextSize / 2) + "px";
			nextBase.style.left = (this.gridW * this.nextSize / 2) + "px";
			nextPanel.appendChild(nextBase);
			
			for(let j = 0; j < 3; j++){
				
				for(let k = 0; k < 3; k++){
					
					let block = document.createElement("canvas");
					block.className = "block";
					block.id = "np" + i + "b" + (j + 3 * k);
					block.style.width = (this.gridW * this.nextSize) + "px";
					block.style.height = (this.gridH * this.nextSize) + "px";
					block.style.top = (k * this.gridH * this.nextSize - k * 0.1) + "px";
					block.style.left = (j * this.gridW * this.nextSize) + "px";
					nextBase.appendChild(block);
					
				}
				
			}
			
			this.nextPanel[i] = new MondPanel("np" + i);
			
		}
		
        let trickPanel = document.createElement("div");
        trickPanel.id = "tp1";
		trickPanel.className = "mondPanel";
		trickPanel.style.width = ((this.gridW) * 10) + "px";
		trickPanel.style.height = ((this.gridH) * 2) + "px";
		trickPanel.style.top = (this.gridH * (this.height - 8)) + "px";
		trickPanel.style.left = (this.gridW * (this.width + 8)) + "px";
		document.getElementsByTagName("body")[0].insertBefore(trickPanel, document.getElementById("info").nextSibling);
			
		let trickBase = document.createElement("div");
		trickBase.id = "tb1";
		trickBase.style.width = ((this.gridW ) * 9) + "px";
		trickBase.style.height = ((this.gridH) * 1) + "px";
		trickBase.style.top = (this.gridH  / 2) + "px";
		trickBase.style.left = (this.gridW / 2) + "px";
		trickPanel.appendChild(trickBase);
			
		for(let j = 0; j < 9; j++){
									
			let block = document.createElement("canvas");
			block.className = "block";
			block.id = "tp1" + "b" + (j);
			block.style.width = (this.gridW) + "px";
			block.style.height = (this.gridH) + "px";
			block.style.top = 0 + "px";
			block.style.left = (j * this.gridW) + "px";
			trickBase.appendChild(block);
							
		}
		
		this.trickPanel = new TrickPanel("tp1");
		
        trickPanel = document.createElement("div");
        trickPanel.id = "tp2";
		trickPanel.className = "mondPanel";
		trickPanel.style.width = ((this.gridW) * 10) + "px";
		trickPanel.style.height = ((this.gridH) * 2) + "px";
		trickPanel.style.top = (this.gridH * (5)) + "px";
		trickPanel.style.left = (this.gridW * (4)) + "px";
		info.appendChild(trickPanel);
			
		trickBase = document.createElement("div");
		trickBase.id = "tb2";
		trickBase.style.width = ((this.gridW ) * 9) + "px";
		trickBase.style.height = ((this.gridH) * 1) + "px";
		trickBase.style.top = (this.gridH  / 2) + "px";
		trickBase.style.left = (this.gridW / 2) + "px";
		trickPanel.appendChild(trickBase);
			
		for(let j = 0; j < 9; j++){
									
			let block = document.createElement("canvas");
			block.className = "block";
			block.id = "tp2" + "b" + (j);
			block.style.width = (this.gridW) + "px";
			block.style.height = (this.gridH) + "px";
			block.style.top = 0 + "px";
			block.style.left = (j * this.gridW) + "px";
			trickBase.appendChild(block);
							
		}
		
		this.trickList = new TrickPanel("tp2");
		
		
        let button = document.createElement("button");
		button.id = "mode0";
		button.className = "button";
		button.type = "button";
		button.innerText = "Start";
		button.style.top = (this.gridH * 5) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "help";
		button.className = "button";
		button.type = "button";
		button.innerText = "ヘルプ";
		button.style.top = (this.gridH * 9) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "modeSelect";
		button.className = "button";
		button.type = "button";
		button.innerText = "モード選択";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "howToPlay";
		button.className = "button";
		button.type = "button";
		button.innerText = "遊び方";
		button.style.top = (this.gridH * 5) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "howToOperate";
		button.className = "button";
		button.type = "button";
		button.innerText = "操作方法";
		button.style.top = (this.gridH * 9) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "trickList";
		button.className = "button";
		button.type = "button";
		button.innerText = "役一覧";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "next";
		button.className = "button";
		button.type = "button";
		button.innerText = "次へ";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "prev";
		button.className = "button";
		button.type = "button";
		button.innerText = "前へ";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);

		
        button = document.createElement("button");
		button.id = "mode1";
		button.className = "button";
		button.type = "button";
		button.innerText = "二十列揃え";
		button.style.top = (this.gridH * 5) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "mode2";
		button.className = "button";
		button.type = "button";
		button.innerText = "二万点チャレンジ";
		button.style.top = (this.gridH * 9) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "mode3";
		button.className = "button";
		button.type = "button";
		button.innerText = "役チャレンジ";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "reset";
		button.className = "button";
		button.type = "button";
		button.innerText = "Reset";
		button.style.top = (this.gridH * (this.height - 2)) + "px";
		button.style.borderColor = "black"
        document.getElementsByTagName("body")[0].insertBefore(button, document.getElementById("info").nextSibling);		
		
        button = document.createElement("button");
		button.id = "return0";
		button.className = "returnButton";
		button.type = "button";
		button.innerText = "戻る";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "return1";
		button.className = "returnButton";
		button.type = "button";
		button.innerText = "戻る";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "pause";
		button.className = "button";
		button.type = "button";
		button.innerText = "Pause";
        document.getElementsByTagName("body")[0].insertBefore(button, document.getElementById("reset").nextSibling);
		
        button = document.createElement("button");
		button.id = "reopening";
		button.className = "button";
		button.type = "button";
		button.innerText = "再開する";
		button.style.top = (this.gridH * 5) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "retry";
		button.className = "button";
		button.type = "button";
		button.innerText = "やり直す";
		button.style.top = (this.gridH * 9) + "px";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "returnToTop";
		button.className = "button";
		button.type = "button";
		button.innerText = "トップ画面へ";
		button.style.top = (this.gridH * 13) + "px";
        info.appendChild(button);
		
		this.setButtonTra();
		this.setAllButtonHidden();
		
    }

    paintAll(){
        
        for(let i = 0; i < this.width; i++){
                            
            for(let j = 0; j < this.height + this.hHeight; j++){
                    
                this.block[i][j].paint();
                
            }
                
        }
        
    }

    resetGhost(){
        
        for(let i = 0; i < this.width; i++){
                            
            for(let j = 0; j < this.height + this.hHeight; j++){
                
                if(this.block[i][j].lefG || this.block[i][j].midG || this.block[i][j].rigG){
					
					this.block[i][j].resetGhost();
					this.block[i][j].paint();
					
				}
				
            }
                
        }
        
    }

    grayBlock(){
		
        for(let i = 0; i < this.width; i++){
                            
            for(let j = 0; j < this.height + this.hHeight; j++){
                
                if(this.block[i][j].lef || this.block[i][j].mid || this.block[i][j].rig){
					
					this.block[i][j].resetKind();
					this.block[i][j].paint();
					
				}
				
            }
                
        }
		
	}

    removeAllBlock(){
		
        for(let i = 0; i < this.width; i++){
                            
            for(let j = 0; j < this.height + this.hHeight; j++){
                
                if(this.block[i][j].lef || this.block[i][j].mid || this.block[i][j].rig){
					
					this.block[i][j].remove(0);
					this.block[i][j].remove(1);
					this.block[i][j].remove(2);
  					this.block[i][j].paint();
					
				}
				
            }
                
        }
		
	}

    setPage(page){
		
        this.setAllLabelHidden();
		this.setAllButtonHidden();
		this.removeButtonTra();
		
		switch(page){
				
			case -1:
				
				this.setHidden("info");
				break;
				
			case 0:
				
				this.setVisible("info");
				this.setVisible("mode0");
				this.setVisible("help");
				this.setVisible("modeSelect");
				this.setInfoTitle("Pentamond");
				break;

			case 1:
				
				this.setVisible("info");
				this.setVisible("howToPlay");
				this.setVisible("howToOperate");
				this.setVisible("trickList");
				this.setVisible("return0");
				this.setInfoTitle("ヘルプ");
				break;
				
			case 2:
				
				this.setVisible("info");
				this.setVisible("mode1");
				this.setVisible("mode2");
				this.setVisible("mode3");
				this.setVisible("return0");
				this.setInfoTitle("モード選択");
				break;

			case 3:
				
				this.setVisible("info");
				this.setVisible("return1");
				this.setInfoTitle("遊び方");
				this.writeInfo("<p>ブロックを操作して積み上げていきます<br>"
							  +"Enterを押すと一番下の列を消すことができ、<br>"
							  +"その消した列が特定の形(役と言います)のとき、<br>"
							  +"たくさん点数を稼ぐことができます<br>"
							  +"また、役を作ることで残り時間も回復します<br>"
							  +"役が成立しない列消しは残り時間が減ってしまうことがあります<br>"
							  +"できるだけ多くの役を作りながらハイスコアを目指しましょう</p>");
				break;
				
			case 4:
				
				this.setVisible("info");
				this.setVisible("return1");
				this.setInfoTitle("操作方法");
                this.writeInfo("<p>←→……左右移動<br>"
							   +"↑……設置<br>"
							   +"↓……下移動・滑り移動<br>"
							   +"C……左回転<br>"
							   +"V……右回転<br>"
							   +"Space……ホールド<br>"
							   +"P……ポーズ<br>"
							   +"R……トップ画面</p>");
				break;
				
			case 5:
				
				this.setVisible("info");
				this.setVisible("return1");
				this.setVisible("next");
				this.setVisible("prev");
				this.setVisible("tp2")
				this.setInfoTitle("役一覧");
				this.trickOrdinal = 0;
				this.trickList.display(0);
				this.writeInfo("<p><br><br><br>"
							   +"名前　：　" + this.trickList.getName() + "<br>"
							   +"基礎点　：　" + this.trickList.getPoint() + "<br>"
							   + (this.trickOrdinal + 1) + "/" + (this.trickList.trick.number) + "<br>"
							   +"</p>");
				break;
				
			case 6:
				
				this.setVisible("info");
				this.setVisible("reopening");
				this.setVisible("retry");
				this.setVisible("returnToTop");
				this.setInfoTitle("Pause");
				break;

		}
		
		this.setButtonTra();
		this.page = page;
		
	}

    setSize(){
		
	    this.gridH = this.gridW * Math.sqrt(3) / 2;
        
        let base = document.getElementById("base");
        base.style.width = (this.gridW * (this.width + 2)) + "px";
        base.style.height = (this.gridH * (this.height + 1)) + "px";
        base.style.top = (-this.gridH / 2) + "px";
        
        let blockBase = document.getElementById("blockBase");
        blockBase.style.width = (this.gridW * this.width) + "px";
        blockBase.style.height = (this.gridH * this.height) + "px";
        blockBase.style.left = this.gridW + "px";

        for(let i = 0; i < this.width; i++){
                
            for(let j = 0; j < this.height + this.hHeight; j++){
                    
                let block = document.getElementById("b" + (i + this.width * j))
                block.style.width = this.gridW + "px";
                block.style.height = this.gridH + "px";
                block.style.top = ((j - this.hHeight) * this.gridH - j * 0.1) + "px";
                block.style.left = (i * this.gridW) + "px";
                
            }
                
        }
		
		let time = document.getElementById("time");
		time.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		time.style.top = (this.gridH * 2) + "px";
		time.style.left = (this.gridW * (this.width + 8)) + "px";
		time.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let score = document.getElementById("score");
		score.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		score.style.top = (this.gridH * (this.height - 2)) + "px";
		score.style.left = (this.gridW * (this.width + 3)) + "px";
		score.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let lineInform = document.getElementById("lineInform");
		lineInform.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		lineInform.style.top = (this.gridH * (this.height - 4)) + "px";
		lineInform.style.left = (this.gridW * (this.width + 3)) + "px";
		lineInform.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let trick = document.getElementById("trick");
		trick.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		trick.style.top = (this.gridH * 6) + "px";
		trick.style.left = (this.gridW * (this.width + 8)) + "px";
		trick.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let trickGoal = document.getElementById("trickGoal");
		trickGoal.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		trickGoal.style.top = (this.gridH * 8) + "px";
		trickGoal.style.left = (this.gridW * (this.width + 8)) + "px";
		trickGoal.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let info = document.getElementById("info");
		info.style.width = (this.gridW * (this.width * 2)) + "px";
		info.style.height = (this.gridH * (this.height - 1)) + "px";
		info.style.top = this.gridW + "px";
		info.style.left = (this.gridW * (this.width + 4)) + "px";
		
		let infoTitle = document.getElementById("infoTitle");
		infoTitle.style.width = (this.gridW * (this.width * 2)) + "px";
		infoTitle.style.height = "0px";
		infoTitle.style.top = this.gridH * 2 + "px";
		infoTitle.style.left = (this.gridW * 2) + "px";
		infoTitle.style.fontSize = (35 * this.gridW / 30) + "px";
		
		let infoBody = document.getElementById("infoBody");
		infoBody.style.width = (this.gridW * (this.width * 2 - 4)) + "px";
		infoBody.style.height = (this.gridH * (this.height - 7)) + "px";
		infoBody.style.top = this.gridH * 6 + "px";
		infoBody.style.left = (this.gridW * 2) + "px";
		infoBody.style.fontSize = (17 * this.gridW / 30) + "px";
		
		let button = document.getElementsByClassName("button");
		for(let b of button){
			
			b.style.width = (this.gridW * 6) + "px";
		    b.style.height = (this.gridH * 2) + "px";
			b.style.left = (this.gridW * (this.width - 3)) + "px";
			b.style.fontSize = (20 * this.gridW / 30) + "px";
			
		}
		
		button = document.getElementsByClassName("returnButton");
		for(let b of button){
			
			b.style.width = (this.gridW * 3) + "px";
		    b.style.height = (this.gridH * 1) + "px";
			b.style.left = (this.gridW * (this.width * 2 - 5)) + "px";
			b.style.top = (this.gridH * (this.height - 4)) + "px";
			b.style.fontSize = (15 * this.gridW / 30) + "px";
			
		}
		
        document.getElementById("reset").style.left = (this.gridW * (this.width + 14)) + "px";
		
		let next = document.getElementById("next");
		next.style.left = (this.gridW * 12) + "px";
		next.style.width = (this.gridW * 3) + "px";
		next.style.height = (this.gridW * 1) + "px";
		
		let prev = document.getElementById("prev");
		prev.style.left = (this.gridW * 3) + "px";
		prev.style.width = (this.gridW * 3) + "px";
		prev.style.height = (this.gridW * 1) + "px";
		
    }

    removeLine(){
		
		let result = [
			this.block[0][this.height + this.hHeight - 1].getShape(),	 
			this.block[1][this.height + this.hHeight - 1].getShape(),	 
			this.block[2][this.height + this.hHeight - 1].getShape(),	 
			this.block[3][this.height + this.hHeight - 1].getShape(),	 
			this.block[4][this.height + this.hHeight - 1].getShape(),	 
			this.block[5][this.height + this.hHeight - 1].getShape(),	 
			this.block[6][this.height + this.hHeight - 1].getShape(),	 
			this.block[7][this.height + this.hHeight - 1].getShape(),	 
			this.block[8][this.height + this.hHeight - 1].getShape(),	 					 
		];
		
		for(let i = this.height + this.hHeight - 1; i >= 0; i--){
			
			for(let j = 0; j < this.width; j++){
				
				if(i != 0){
					
                    this.block[j][i].setShape(this.block[j][i - 1].getShape());
				    this.block[j][i].setKind(this.block[j][i - 1].lefKind, this.block[j][i - 1].midKind, this.block[j][i - 1].rigKind);
					
				}else{
					
					this.block[j][0].setShape([false, false, false, true, false, false]);
					
				}
				
			}
			
		}
		
		this.paintAll();
		return result;
		
	}

    setButtonTra(){
		
		let button = document.getElementsByClassName("button");
		for(let b of button){
			
			if(b.style.visibility == "visible"){
				
				b.style.transition = this.buttonTra;
				
			}
			
		}
		
		button = document.getElementsByClassName("returnButton");
		for(let b of button){
			
			if(b.style.visibility == "visible"){
				
				b.style.transition = this.buttonTra;
				
			}
			
		}
		
	}

    removeButtonTra(){
		
		let button = document.getElementsByClassName("button");
		for(let b of button){
			
			b.style.transition = "";
			
		}
		
		button = document.getElementsByClassName("returnButton");
		for(let b of button){
			
			b.style.transition = "";
			
		}
		
	}

    setAllButtonHidden(){
		
		let button = document.getElementsByClassName("button");
		for(let b of button){
			
			b.style.visibility = "hidden";
			
		}
		
		button = document.getElementsByClassName("returnButton");
		for(let b of button){
			
			b.style.visibility = "hidden";
			
		}

	}

    setVisible(id){
		
		document.getElementById(id).style.visibility = "visible";
		
	}

    setHidden(id){
		
		document.getElementById(id).style.visibility = "hidden";
		
	}

    setTimeElement(time){
		
		this.setVisible("time");
		document.getElementById("time").innerText = "Time : " + time;
		
	}

    setScoreElement(score){
		
		this.setVisible("score");
		document.getElementById("score").innerText = "Score : " + score;
		
	}

    setTrickElement(trick){
						
		this.setVisible("trick");
		 document.getElementById("trick").innerText = trick;
		
	}

    setTrickGoalElement(trick){
		
		this.setVisible("trickGoal");
        document.getElementById("trickGoal").innerText = trick + "を作りましょう";
		
	}

    setLineInformElement(line){
		
		this.setVisible("lineInform");
		 document.getElementById("lineInform").innerText = "Line : " + line;
		
	}

    setAllLabelHidden(){
		
        this.setHidden("time");
        this.setHidden("score");
        this.setHidden("trick");
        this.setHidden("trickGoal");
        this.setHidden("lineInform");
		this.setHidden("tp1");
		this.setHidden("tp2");
		this.writeInfo("");
		this.setInfoTitle("");
		
	}

    writeInfo(info){
		
		document.getElementById("infoBody").innerHTML = info;
		
	}

    setInfoTitle(title){
		
		document.getElementById("infoTitle").innerText = title;
		
	}

    resetMondPanel(){
		
		for(let i = 0; i < this.next; i++){
			
			this.nextPanel[i].display(0);
			
		}
		
		this.holdPanel.display(0);
		
	}

    nextTrick(){
		
		if(this.page != 5){
			
			return;
			
		}
		
		if(this.trickOrdinal + 1 == this.trickList.trick.number){
			
			this.trickOrdinal = 0;
			
		}else{
			
			this.trickOrdinal++;
			
		}
		
		this.trickList.display(this.trickOrdinal);
		this.writeInfo("<p><br><br><br>"
					   +"名前　：　" + this.trickList.getName() + "<br>"
					   +"基礎点　：　" + this.trickList.getPoint() + "<br>"
					   + (this.trickOrdinal + 1) + "/" + (this.trickList.trick.number) + "<br>"
					   +"</p>");
		
		
	}

    prevTrick(){
		
		if(this.page != 5){
			
			return;
			
		}
		
		if(this.trickOrdinal == 0){
			
			this.trickOrdinal = this.trickList.trick.number - 1;
			
		}else{
			
			this.trickOrdinal--;
			
		}
		
		this.trickList.display(this.trickOrdinal);
		this.writeInfo("<p><br><br><br>"
					   +"名前　：　" + this.trickList.getName() + "<br>"
					   +"基礎点　：　" + this.trickList.getPoint() + "<br>"
					   + (this.trickOrdinal + 1) + "/" + (this.trickList.trick.number) + "<br>"
					   +"</p>");
		
		
	}

}