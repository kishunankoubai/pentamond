class Control{

    height = 20;
    width = 9;
    hHeight = 16;
	leftPadding = 2;
	bottomPadding = 1;
	infoWidth = 16;
    gridH = (window.innerHeight) / (this.height + this.bottomPadding + 1);
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

	mode0Score = null;
	mode1Time = null;
	mode2Time = null;
	mode3Score = null;

	currentBgm = null;
	mPut = document.getElementById("mPut");
	mRRot = document.getElementById("mRRot");
	mLRot = document.getElementById("mLRot");
	mMove = document.getElementById("mMove");
	mSFall = document.getElementById("mSFall");
	mUnPut = document.getElementById("mUnPut");
	mHold = document.getElementById("mHold");
	mTRem = document.getElementById("mTRem");
	mNTRem = document.getElementById("mNTRem");
	maxVol = 10;
	SEMasterVol = 6;
	BGMMasterVol = 6;
            
    constructor(){
        
		this.restoreFromLocalStorage();
		this.setElement();
		this.setSize();
		this.paintAll();
		this.setPage(0);
        
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
                blockBase.appendChild(block);
                this.block[i][j] = new Block("b" + (i + this.width * j));
                
            }
                
        }
		
		let info = document.getElementById("info");
		
        let holdPanel = document.createElement("div");
        holdPanel.id = "hp";
		holdPanel.className = "mondPanel";
		document.getElementsByTagName("body")[0].insertBefore(holdPanel, document.getElementById("info").nextSibling);
			
		let holdBase = document.createElement("div");
		holdBase.id = "hb";
		holdPanel.appendChild(holdBase);
			
		for(let j = 0; j < 3; j++){
				
			for(let k = 0; k < 3; k++){
					
				let block = document.createElement("canvas");
				block.className = "block";
				block.id = "hp" + "b" + (j + 3 * k);
				holdBase.appendChild(block);
					
			}
				
		}
			
		this.holdPanel = new MondPanel("hp");
		
		this.nextPanel = new Array(this.next);

		for(let i = 0; i < this.next; i++){
			
            let nextPanel = document.createElement("div");
			nextPanel.id = "np" + i;
			nextPanel.className = "mondPanel";
            document.getElementsByTagName("body")[0].insertBefore(nextPanel, document.getElementById("info").nextSibling);
			
			let nextBase = document.createElement("div");
			nextBase.id = "nb" + i;

			nextPanel.appendChild(nextBase);
			
			for(let j = 0; j < 3; j++){
				
				for(let k = 0; k < 3; k++){
					
					let block = document.createElement("canvas");
					block.className = "block";
					block.id = "np" + i + "b" + (j + 3 * k);
					nextBase.appendChild(block);
					
				}
				
			}
			
			this.nextPanel[i] = new MondPanel("np" + i);
			
		}
		
        let trickPanel = document.createElement("div");
        trickPanel.id = "tp1";
		trickPanel.className = "mondPanel";
		document.getElementsByTagName("body")[0].insertBefore(trickPanel, document.getElementById("info").nextSibling);
			
		let trickBase = document.createElement("div");
		trickBase.id = "tb1";
		trickPanel.appendChild(trickBase);
			
		for(let j = 0; j < 9; j++){
									
			let block = document.createElement("canvas");
			block.className = "block";
			block.id = "tp1" + "b" + (j);
			trickBase.appendChild(block);
							
		}
		
		this.trickPanel = new TrickPanel("tp1");
		
        trickPanel = document.createElement("div");
        trickPanel.id = "tp2";
		trickPanel.className = "mondPanel";
		info.appendChild(trickPanel);
			
		trickBase = document.createElement("div");
		trickBase.id = "tb2";
		trickPanel.appendChild(trickBase);
			
		for(let j = 0; j < 9; j++){
									
			let block = document.createElement("canvas");
			block.className = "block";
			block.id = "tp2" + "b" + (j);
			trickBase.appendChild(block);
							
		}
		
		this.trickList = new TrickPanel("tp2");
		
		
        let button = document.createElement("button");
		button.id = "mode0";
		button.className = "button";
		button.type = "button";
		button.innerText = "Start";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "help";
		button.className = "button";
		button.type = "button";
		button.innerText = "ヘルプ";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "modeSelect";
		button.className = "button";
		button.type = "button";
		button.innerText = "モード選択";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "howToPlay";
		button.className = "button";
		button.type = "button";
		button.innerText = "遊び方";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "howToOperate";
		button.className = "button";
		button.type = "button";
		button.innerText = "操作方法";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "trickList";
		button.className = "button";
		button.type = "button";
		button.innerText = "役一覧";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "next";
		button.className = "button";
		button.type = "button";
		button.innerText = "次へ";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "prev";
		button.className = "button";
		button.type = "button";
		button.innerText = "前へ";
        info.appendChild(button);

		
        button = document.createElement("button");
		button.id = "mode1";
		button.className = "button";
		button.type = "button";
		button.innerText = "十五列揃え";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "mode2";
		button.className = "button";
		button.type = "button";
		button.innerText = "二万点チャレンジ";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "mode3";
		button.className = "button";
		button.type = "button";
		button.innerText = "役チャレンジ";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "reset";
		button.className = "button";
		button.type = "button";
		button.innerText = "Reset";
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
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "retry";
		button.className = "button";
		button.type = "button";
		button.innerText = "やり直す";
        info.appendChild(button);
		
        button = document.createElement("button");
		button.id = "returnToTop";
		button.className = "button";
		button.type = "button";
		button.innerText = "トップ画面へ";
        info.appendChild(button);
		
		button = document.createElement("button");
		button.id = "gamepadMode0";
		button.className = "gamepadButton";
		button.type = "button";
		button.innerText = "タイプ1";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "gamepadMode1";
		button.className = "gamepadButton";
		button.type = "button";
		button.innerText = "タイプ2";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "gamepadMode2";
		button.className = "gamepadButton";
		button.type = "button";
		button.innerText = "タイプ3";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "setting";
		button.className = "littleButton";
		button.type = "button";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "record";
		button.className = "littleButton";
		button.type = "button";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "volumeSetting";
		button.className = "button";
		button.type = "button";
		button.innerText = "音量設定";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "inputSetting";
		button.className = "button";
		button.type = "button";
		button.innerText = "入力設定";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "keySetting";
		button.className = "button";
		button.type = "button";
		button.innerText = "キーボード設定";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "gamepadSetting";
		button.className = "button";
		button.type = "button";
		button.innerText = "コントローラー";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "return8";
		button.className = "returnButton";
		button.type = "button";
		button.innerText = "戻る";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "return10";
		button.className = "returnButton";
		button.type = "button";
		button.innerText = "戻る";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "SEVolumeUp";
		button.className = "littleButton";
		button.type = "button";
		button.innerText = "+";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "SEVolumeDown";
		button.className = "littleButton";
		button.type = "button";
		button.innerText = "-";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "BGMVolumeUp";
		button.className = "littleButton";
		button.type = "button";
		button.innerText = "+";
        info.appendChild(button);

		button = document.createElement("button");
		button.id = "BGMVolumeDown";
		button.className = "littleButton";
		button.type = "button";
		button.innerText = "-";
        info.appendChild(button);

		let label = document.createElement("div");
		label.id = "SEVolume";
		label.className = "informLabel";
		label.innerText = "　SE音量　：　" + this.SEMasterVol;
		info.appendChild(label);

		label = document.createElement("div");
		label.id = "BGMVolume";
		label.className = "informLabel";
		label.innerText = "BGM音量　：　" + this.BGMMasterVol;
		info.appendChild(label);

		button = document.createElement("button");
		button.id = "recordRemove";
		button.className = "button";
		button.type = "button";
		button.innerText = "データ削除";
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
				
			//infoパネルを非表示
			case -1:
				
				this.setHidden("info");
				break;
				
			//初期画面
			case 0:
				
				this.setVisible("info");
				this.setVisible("mode0");
				this.setVisible("help");
				this.setVisible("modeSelect");
				this.setVisible("setting");
				this.setVisible("record");
				this.setInfoTitle("Pentamond");
				break;

			//ヘルプを押した場合
			case 1:
				
				this.setVisible("info");
				this.setVisible("howToPlay");
				this.setVisible("howToOperate");
				this.setVisible("trickList");
				this.setVisible("return0");
				this.setInfoTitle("ヘルプ");
				break;
				
			//モード選択を押した場合
			case 2:
				
				this.setVisible("info");
				this.setVisible("mode1");
				this.setVisible("mode2");
				this.setVisible("mode3");
				this.setVisible("return0");
				this.setInfoTitle("モード選択");
				break;

			//ヘルプ、遊び方を押した場合
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
			
			//ヘルプ、操作方法を押した場合
			case 4:
				
				this.setVisible("info");
				this.setVisible("return1");
				this.setInfoTitle("操作方法");
                this.writeInfo("<p>←→……左右移動<br>"
							   +"↑……設置<br>"
							   +"↓……下移動・滑り移動<br>"
							   +"C……左回転<br>"
							   +"V……右回転<br>"
							   +"B……一手戻す<br>"
							   +"Space……ホールド<br>"
							   +"P……ポーズ<br>"
							   +"R……トップ画面</p>");
				break;
				
			//ヘルプ、役一覧を押した場合
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
				
			//ポーズ画面
			case 6:
				
				this.setVisible("info");
				this.setVisible("reopening");
				this.setVisible("retry");
				this.setVisible("returnToTop");
				this.setInfoTitle("Pause");
				break;

			//コントローラーを接続したときの画面
			case 7:
				
				this.setVisible("info");
				this.setVisible("gamepadMode0");
				this.setVisible("gamepadMode1");
				this.setVisible("gamepadMode2");
				this.setInfoTitle("コントローラー設定");
				this.writeInfo("<p>コントローラーが接続されました<br>"
							   +"以下からボタンの割り当てを選んでください<br>"
							   +"後から設定を変更したい場合はコントローラーを接続しなおしてください</p>");
				break;

			//右上の歯車を押した場合
			//設定画面
			case 8:

				this.setVisible("info");
				this.setVisible("volumeSetting");
				//this.setVisible("inputSetting");
				this.setVisible("return0");
				this.setInfoTitle("設定");
				break;

			//歯車、音量設定を押した場合
			//音量設定画面
			case 9:

				this.setVisible("info");
				this.setVisible("SEVolumeUp");
				this.setVisible("SEVolumeDown");
				this.setVisible("SEVolume");
				this.setVisible("BGMVolumeUp");
				this.setVisible("BGMVolumeDown");
				this.setVisible("BGMVolume");
				this.setVisible("return8");
				this.setInfoTitle("設定");
				break;

			//歯車、入力設定を押した場合
			//入力設定画面
			case 10:

				this.setVisible("info");
				this.setVisible("keySetting");
				this.setVisible("gamepadSetting");
				this.setVisible("return8");
				this.setInfoTitle("入力設定");
				break;

			//歯車、入力設定、キーボード設定を押した場合
			//キーボードの設定画面
			case 11:
				this.setVisible("info");
				this.setVisible("return10");
				this.setInfoTitle("キーボード設定");
				break;

			//歯車、入力設定、コントローラーを押した場合
			//コントローラーの設定画面
			case 12:
				this.setVisible("info");
				this.setVisible("return10");
				this.setInfoTitle("コントローラー設定");
				break;

			//右上のトロフィーを押した場合
			//記録確認画面
			case 13:
				this.setVisible("info");
				this.setVisible("return0");
				this.setInfoTitle("プレイの記録");
				this.setVisible("recordRemove");
				this.writeInfo("通常モード　　　　 Best Score	: " + this.getBestRecord(0) + "<br>"
							  +"十五列揃え　　　　 Best Time	: " + this.getBestRecord(1) + "<br>"
							  +"二万点チャレンジ　 Best Time	: " + this.getBestRecord(2) + "<br>"
							  +"役チャレンジ　　　 Best Score	: " + this.getBestRecord(3)
				);
				break;

		}
		
		this.setButtonTra();
		this.page = page;
		
	}

    setSize(){
		
		this.gridH = (window.innerHeight) / (this.height + this.bottomPadding + 1);
		this.gridW = Math.floor(this.gridH * 2 / Math.sqrt(3));
        
        let base = document.getElementById("base");
        base.style.width = (this.gridW * (this.width + 2)) + "px";
        base.style.height = (this.gridH * (this.height + 1)) + "px";
		base.style.left = (this.gridW * (this.leftPadding) + 6) + "px"
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

		let holdPanel = document.getElementById("hp");
		holdPanel.style.width = ((this.gridW * this.holdSize) * 4) + "px";
		holdPanel.style.height = ((this.gridH * this.holdSize) * 4) + "px";
		holdPanel.style.top = 0 + "px";
		holdPanel.style.left = (this.gridW * (this.width + 2 + this.leftPadding) + 11) + "px";

		let holdBase = document.getElementById("hb");
		holdBase.style.width = ((this.gridW * this.holdSize) * 3) + "px";
		holdBase.style.height = ((this.gridH * this.holdSize) * 3) + "px";
		holdBase.style.top = (this.gridH * this.holdSize / 2) + "px";
		holdBase.style.left = (this.gridW * this.holdSize / 2) + "px";
			
		for(let j = 0; j < 3; j++){
				
			for(let k = 0; k < 3; k++){
					
				let block = document.getElementById("hp" + "b" + (j + 3 * k));
				block.style.width = (this.gridW * this.holdSize) + "px";
				block.style.height = (this.gridH * this.holdSize) + "px";
				block.style.top = (k * this.gridH * this.holdSize - k * 0.1) + "px";
				block.style.left = (j * this.gridW * this.holdSize) + "px";
					
			}
				
		}


		for(let i = 0; i < this.next; i++){
			
            let nextPanel = document.getElementById("np" + i);
			nextPanel.style.width = ((this.gridW * this.nextSize) * 4) + "px";
			nextPanel.style.height = ((this.gridH * this.nextSize) * 4) + "px";
			nextPanel.style.top = (this.gridH * this.nextSize * 4 * i + this.gridH * (this.holdSize * 4 + 3) + 4 + i * 8) + "px";
			nextPanel.style.left = (this.gridW * (this.width + 2 + this.leftPadding) + 11) + "px";
			
			let nextBase = document.getElementById("nb" + i);
			nextBase.style.width = ((this.gridW * this.nextSize) * 3) + "px";
			nextBase.style.height = ((this.gridH * this.nextSize) * 3) + "px";
			nextBase.style.top = (this.gridH * this.nextSize / 2) + "px";
			nextBase.style.left = (this.gridW * this.nextSize / 2) + "px";
			
			for(let j = 0; j < 3; j++){
				
				for(let k = 0; k < 3; k++){
					
					let block = document.getElementById("np" + i + "b" + (j + 3 * k));
					block.style.width = (this.gridW * this.nextSize) + "px";
					block.style.height = (this.gridH * this.nextSize) + "px";
					block.style.top = (k * this.gridH * this.nextSize - k * 0.1) + "px";
					block.style.left = (j * this.gridW * this.nextSize) + "px";
					
				}
				
			}
						
		}

		let trickPanel = document.getElementById("tp1");
		trickPanel.style.width = ((this.gridW) * 10) + "px";
		trickPanel.style.height = ((this.gridH) * 2) + "px";
		trickPanel.style.top = (this.gridH * (this.height - 8)) + "px";
		trickPanel.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
			
		let trickBase = document.getElementById("tb1");
		trickBase.style.width = ((this.gridW ) * 9) + "px";
		trickBase.style.height = ((this.gridH) * 1) + "px";
		trickBase.style.top = (this.gridH  / 2) + "px";
		trickBase.style.left = (this.gridW / 2) + "px";
			
		for(let j = 0; j < 9; j++){
									
			let block = document.getElementById("tp1" + "b" + (j));
			block.style.width = (this.gridW) + "px";
			block.style.height = (this.gridH) + "px";
			block.style.top = 0 + "px";
			block.style.left = (j * this.gridW) + "px";
							
		}
				
        trickPanel = document.getElementById("tp2");
		trickPanel.style.width = ((this.gridW) * 10) + "px";
		trickPanel.style.height = ((this.gridH) * 2) + "px";
		trickPanel.style.top = (this.gridH * (5)) + "px";
		trickPanel.style.left = (this.gridW * (this.infoWidth / 2 - 5)) + "px";
			
		trickBase = document.getElementById("tb2");
		trickBase.style.width = ((this.gridW ) * 9) + "px";
		trickBase.style.height = ((this.gridH) * 1) + "px";
		trickBase.style.top = (this.gridH  / 2) + "px";
		trickBase.style.left = (this.gridW / 2) + "px";
			
		for(let j = 0; j < 9; j++){
									
			let block = document.getElementById("tp2" + "b" + (j));
			block.style.width = (this.gridW) + "px";
			block.style.height = (this.gridH) + "px";
			block.style.top = 0 + "px";
			block.style.left = (j * this.gridW) + "px";
							
		}
		
		let time = document.getElementById("time");
		time.style.width = (this.gridW * (this.infoWidth / 2 + 1)) + "px";
		time.style.top = (this.gridH * 2) + "px";
		time.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
		time.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let score = document.getElementById("score");
		score.style.width = (this.gridW * (this.infoWidth / 2 + 1)) + "px";
		score.style.top = (this.gridH * (this.height - 4)) + "px";
		score.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
		score.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let lineInform = document.getElementById("lineInform");
		lineInform.style.width = (this.gridW * (this.infoWidth / 2 + 1)) + "px";
		lineInform.style.top = (this.gridH * (this.height - 6)) + "px";
		lineInform.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
		lineInform.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let trick = document.getElementById("trick");
		trick.style.width = (this.gridW * (this.infoWidth / 2 + 5)) + "px";
		trick.style.top = (this.gridH * 6) + "px";
		trick.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
		trick.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let trickGoal = document.getElementById("trickGoal");
		trickGoal.style.width = (this.gridW * (this.infoWidth / 2 + 5)) + "px";
		trickGoal.style.top = (this.gridH * 8) + "px";
		trickGoal.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
		trickGoal.style.fontSize = (30 * this.gridW / 30) + "px";
		
		let info = document.getElementById("info");
		info.style.width = (this.gridW * (this.infoWidth)) + "px";
		info.style.height = (this.gridH * (this.height - 1)) + "px";
		info.style.top = this.gridW + "px";
		info.style.left = (this.gridW * (this.width + 4)) + "px";
		
		let infoTitle = document.getElementById("infoTitle");
		infoTitle.style.width = (this.gridW * (this.infoWidth)) + "px";
		infoTitle.style.height = "0px";
		infoTitle.style.top = this.gridH * 2 + "px";
		infoTitle.style.left = (this.gridW * 2) + "px";
		infoTitle.style.fontSize = (35 * this.gridW / 30) + "px";
		
		let infoBody = document.getElementById("infoBody");
		infoBody.style.width = (this.gridW * (this.infoWidth - 3)) + "px";
		infoBody.style.height = (this.gridH * (this.height - 7)) + "px";
		infoBody.style.top = this.gridH * 6 + "px";
		infoBody.style.left = (this.gridW * 2) + "px";
		infoBody.style.fontSize = (17 * this.gridW / 30) + "px";
		
		let label = document.getElementsByClassName("informLabel");
		for(let l of label){
			l.style.fontSize = (25 * this.gridW / 30) + "px";
		}

		let button = document.getElementsByClassName("button");
		for(let b of button){
			
			b.style.width = (this.gridW * 6) + "px";
		    b.style.height = (this.gridH * 2) + "px";
			b.style.left = (this.gridW * (this.infoWidth / 2 - 3)) + "px";
			b.style.fontSize = (20 * this.gridW / 30) + "px";
			
		}
		
		button = document.getElementsByClassName("returnButton");
		for(let b of button){
			
			b.style.width = (this.gridW * 3) + "px";
		    b.style.height = (this.gridH * 1) + "px";
			b.style.left = (this.gridW * (this.infoWidth - 4)) + "px";
			b.style.top = (this.gridH * (this.height - 3)) + "px";
			b.style.fontSize = (15 * this.gridW / 30) + "px";
			
		}

		button = document.getElementsByClassName("gamepadButton");
		for(let b of button){
			
			b.style.width = (this.gridW * 4) + "px";
		    b.style.height = (this.gridH * 1.5) + "px";
			b.style.top = (this.gridH * (this.height - 4)) + "px";
			b.style.fontSize = (15 * this.gridW / 30) + "px";
			
		}

		button = document.getElementById("mode0");
		button.style.top = (this.gridH * 5) + "px";
		
        button = document.getElementById("help");
		button.style.top = (this.gridH * 9) + "px";
		
        button = document.getElementById("modeSelect");
		button.style.top = (this.gridH * 13) + "px";
		
        button = document.getElementById("howToPlay");
		button.style.top = (this.gridH * 5) + "px";
		
        button = document.getElementById("howToOperate");
		button.style.top = (this.gridH * 9) + "px";
		
        button = document.getElementById("trickList");
		button.style.top = (this.gridH * 13) + "px";
		
        button = document.getElementById("next");
		button.style.top = (this.gridH * 13) + "px";
		
        button = document.getElementById("prev");
		button.style.top = (this.gridH * 13) + "px";
		
        button = document.getElementById("mode1");
		button.style.top = (this.gridH * 5) + "px";
		
        button = document.getElementById("mode2");
		button.style.top = (this.gridH * 9) + "px";
		
        button = document.getElementById("mode3");
		button.style.top = (this.gridH * 13) + "px";
		
        button = document.getElementById("reset");
		button.style.top = (this.gridH * (this.height - 2)) + "px";
		button.style.left = (this.gridW * (this.width + this.leftPadding + 8)) + "px";
				
        button = document.getElementById("reopening");
		button.style.top = (this.gridH * 5) + "px";
		
        button = document.getElementById("retry");
		button.style.top = (this.gridH * 9) + "px";
		
        button = document.getElementById("returnToTop");
		button.style.top = (this.gridH * 13) + "px";

		button = document.getElementById("gamepadMode0");
		button.style.left = (this.gridW * (1)) + "px";

		button = document.getElementById("gamepadMode1");
		button.style.left = (this.gridW * (this.infoWidth / 2 - 2)) + "px";

		button = document.getElementById("gamepadMode2");
		button.style.left = (this.gridW * (this.infoWidth - 5)) + "px";

		button = document.getElementById("volumeSetting");
		button.style.top = (this.gridH * 5) + "px";

		button = document.getElementById("inputSetting");
		button.style.top = (this.gridH * 9) + "px";

		button = document.getElementById("keySetting");
		button.style.top = (this.gridH * 5) + "px";

		button = document.getElementById("gamepadSetting");
		button.style.top = (this.gridH * 9) + "px";

		button = document.getElementById("recordRemove");
		button.style.top = (this.gridH * 13) + "px";

		
		let next = document.getElementById("next");
		next.style.left = (this.gridW * ((this.infoWidth - this.infoWidth / 5) - 3)) + "px";
		next.style.width = (this.gridW * 3) + "px";
		next.style.height = (this.gridW * 1) + "px";
		
		let prev = document.getElementById("prev");
		prev.style.left = (this.gridW * (this.infoWidth / 5)) + "px";
		prev.style.width = (this.gridW * 3) + "px";
		prev.style.height = (this.gridW * 1) + "px";
		
    }

    removeLine(){
		
		let result = [...Array(this.width)].map((i, j) => j).map((i) => (this.block[i][this.height + this.hHeight - 1].getShape()), this);
		
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

		button = document.getElementsByClassName("gamepadButton");
		for(let b of button){
			
			if(b.style.visibility == "visible"){
				
				b.style.transition = this.buttonTra;
				
			}
			
		}

		button = document.getElementsByClassName("littleButton");
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

		button = document.getElementsByClassName("gamepadButton");
		for(let b of button){
			
			b.style.transition = "";
			
		}


		button = document.getElementsByClassName("littleButton");
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

		button = document.getElementsByClassName("gamepadButton");
		for(let b of button){
			
			b.style.visibility = "hidden";
			
		}

		button = document.getElementsByClassName("littleButton");
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

		let label = document.getElementsByClassName("informLabel");
		for(let l of label){
			this.setHidden(l.id);
		}
		
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

	startSE(index){

		let SE;
		let volume = 1;
		switch(index){
			case 0:
				SE = this.mPut;
				break;
			case 1:
				SE = this.mRRot;
				break;
			case 2:
				SE = this.mLRot;
				break;
			case 3:
				SE = this.mMove;
				volume = 0.6;
				break;
			case 4:
				SE = this.mSFall;
				volume = 0.8;	
				break;
			case 5:
				SE = this.mUnPut;
				break;
			case 6:
				SE = this.mHold;
				volume = 0.8;	
				break;
			case 7:
				SE = this.mTRem;
				volume = 0.8;	
				break;
			case 8:
				SE = this.mNTRem;
				volume = 0.7;	
				break;
			

				
		}

		SE.currentTime = 0;
		SE.play();
		SE.volume = (this.SEMasterVol / this.maxVol) * volume;

	}

	startBGM(index){

		let playBGM = () => {

			this.currentBgm = null;
			let volume = 1;
			switch(index){

				case 0:
					this.currentBgm = new IBGM("BGM/ならべてトライアングル.m4a", {loopStart: 3.692, loopEnd: 144});
					volume = 0.6;
					break;

			}

			this.currentBgm.fetch().then(() => {

				this.currentBgm.reset();
				this.currentBgm.setVolume((this.BGMMasterVol / this.maxVol) * volume);
				this.currentBgm.play();

			});

		};

		if(this.currentBgm !=null){
			this.currentBgm.pause().then(() => {playBGM();});
		}else{
			playBGM();
		}

	}

	SEVolumeChange(change){

		if(this.page != 9){
			return;
		}

		if(this.SEMasterVol + change > this.maxVol){
			this.SEMasterVol = this.maxVol;
		}else if(this.SEMasterVol + change < 0){
			this.SEMasterVol = 0;
		}else{
			this.SEMasterVol += change;
		}

		document.getElementById("SEVolume").innerText = "　SE音量　：　" + this.SEMasterVol;
		localStorage.setItem("SEMasterVol", this.SEMasterVol);
	}

	BGMVolumeChange(change){

		if(this.page != 9){
			return;
		}

		if(this.BGMMasterVol + change > this.maxVol){
			this.BGMMasterVol = this.maxVol;
		}else if(this.BGMMasterVol + change < 0){
			this.BGMMasterVol = 0;
		}else{
			this.BGMMasterVol += change;
		}
		document.getElementById("BGMVolume").innerText = "BGM音量　：　" + this.BGMMasterVol;
		localStorage.setItem("BGMMasterVol", this.BGMMasterVol);

	}

	restoreFromLocalStorage(){

		if(localStorage.getItem("SEMasterVol") != null){
			this.SEMasterVol = +localStorage.getItem("SEMasterVol");
		}
		if(localStorage.getItem("BGMMasterVol") != null){
			this.BGMMasterVol = +localStorage.getItem("BGMMasterVol");
		}
		if(localStorage.getItem("mode0Score") != null){
			this.mode0Score = +localStorage.getItem("mode0Score");
		}
		if(localStorage.getItem("mode1Time") != null){
			this.mode1Time = +localStorage.getItem("mode1Time");
		}
		if(localStorage.getItem("mode2Time") != null){
			this.mode2Time = +localStorage.getItem("mode2Time");
		}
		if(localStorage.getItem("mode3Score") != null){
			this.mode3Score = +localStorage.getItem("mode3Score");
		}

	}

	clearRecords(){
		this.mode0Score = null;
		this.mode1Time = null;
		this.mode2Time = null;
		this.mode3Score = null;
		localStorage.removeItem("mode0Score");
		localStorage.removeItem("mode1Time");
		localStorage.removeItem("mode2Time");
		localStorage.removeItem("mode3Score");
		this.setPage(13);
	}

	getBestRecord(mode){

		switch(mode){

			case 0:
				return this.mode0Score ?? "記録なし";
			case 1:
				if(this.mode1Time == null){
					return "記録なし";
				}else{
					let timeRounded = Math.floor(this.mode1Time / 10);
					return Math.floor(timeRounded / 100) + "." + ((timeRounded % 100) < 10 ? "0" + timeRounded % 100 : timeRounded % 100);
				}
			case 2:
				if(this.mode2Time == null){
					return "記録なし";
				}else{
					let timeRounded = Math.floor(this.mode2Time / 10);
					return Math.floor(timeRounded / 100) + "." + ((timeRounded % 100) < 10 ? "0" + timeRounded % 100 : timeRounded % 100);
				}
			case 3:
				return this.mode3Score ?? "記録なし";

		}

	}

}