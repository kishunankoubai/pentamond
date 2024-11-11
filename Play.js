class Play{
	
	c = null;
    pm = null;
	prevPm = null;

    initialTime = 300;
    time1 = 0;
    time2 = 0;
    startTime = 0;
    penalty = 0;
    pauseTime = 0;
    penaltyCount = 0;
    score = 0;
    chain = 0;
	prev = 0;
    next = [1, 2, 3, 4, 5, 6];
    next2 = [1, 2, 3, 4, 5, 6];
    nextCount = 0;
    putCount = 0;
    lineCount = 0;
    holdKind = 0;
    mode = 0;
    trick = null;
    trickGoal = null;
    finish = false;
    pausing = false;

    timer1 = null;
    timer2 = null;

    constructor(c){
		
		this.c = c;
		this.initialTime = c.initialTime;
		this.pm = new Pentiamond(this.c);
		this.pm.setInvalidate(true);
		this.trick = new Trick();
		this.trickGoal = new Trick();
		
	}

    start(){
		
		if(!this.pm.invalidate || this.finish || this.pausing){
			
			return;
			
		}
		
		this.c.setPage(-1);
		this.startTime = Date.now();
		this.reloadTime1();
		this.reloadTime2();
		this.c.setScoreElement(0);
		this.c.setTrickElement("");
		
		if(this.mode == 0){
			
			this.startTimer1();
			this.c.startBGM(0);
			
		}
		
		if(this.mode == 1){
			
			this.startTimer2();
            this.c.setLineInformElement(0);
			this.c.startBGM(0);

		}
		
		if(this.mode == 2){
			
			this.startTimer2();
			this.c.startBGM(0);
			
		}
		
		if(this.mode == 3){
			
			this.startTimer1();
			this.trickGoal.setOrdinal(this.trickGoal.getRandomOrdinal());
			this.c.setTrickGoalElement(this.trickGoal.getName());
			this.c.trickPanel.display(this.trickGoal.ordinal);
			this.c.setVisible("tp1");
			this.c.startBGM(0);
			
		}
		
		for(let i = 0; i < 100; i++){

			let a = Math.floor(Math.random() * 6);
			let b = Math.floor(Math.random() * 6);
			let c = this.next[a];
			let d = this.next[b];
			this.next[a] = d;
			this.next[b] = c;

        }

		this.mix();
		
		this.newMond();
		
	}

    reset(){

        clearInterval(this.timer1);
        clearInterval(this.timer2);
		
		this.time1 = 0;
		this.time2 = 0;
		this.startTime = 0;
		this.penalty = 0;
		this.pauseTime = 0;
		this.penaltyCount = 0;
		this.score = 0;
		this.chain = 0;
		this.prev = 0;
		this.next = [1, 2, 3, 4, 5, 6];
		this.next2 = [1, 2, 3, 4, 5, 6];
		this.nextCount = 0;
		this.putCount = 0;
		this.lineCount = 0;
		this.holdKind = 0;
		this.mode = 0;
		this.finish = false;
		this.pausing = false;
		this.prevPm = null;
		
		this.pm.remove();
		this.pm = new Pentiamond(this.c);
		this.pm.setInvalidate(true);
		this.createGhost();
        this.c.setPage(0);
		this.c.removeAllBlock();
		this.c.resetMondPanel();
		this.c.startBGM(-1);
		
	}

    newMond(){
		
		if(this.penaltyCount > 0){
			
			this.penaltyCount--;
			
		}
		this.c.setTrickElement("");
		this.chain = 0;
		
		this.pm = new Pentiamond(this.c);
		this.pm.setKind(this.shiftNext());
		//this.pm.setKind(6);
		this.pm.initialize();
		this.pm.display();
		this.createGhost();
		
	}

    moveRight(){
				
		if(this.pm.move(1, 0)){
			this.c.startSE(3);
		}
		this.createGhost();
		
	}

    moveLeft(){
		
		if(this.pm.move(-1, 0)){
			this.c.startSE(3);
		}
		this.createGhost();

	}

    fall(){
		
		switch(this.pm.fall()){
			case 1:
				this.c.startSE(3);
				break;
			case 2:
				this.c.startSE(4);
				break;
		}
		this.createGhost();

	}

    put(){
		
		this.pm.put();
		
		if(this.pm.fixed){
			
			this.putCount++;
			this.scoreUp(10);
			this.prev = this.pm.kind;
			this.prevPm = new Pentiamond(this.c);
			this.prevPm.catch(this.pm.x, this.pm.y, this.pm.dir, this.pm.kind);
			this.newMond();
			this.c.startSE(0);			
		}
		
	}

    spinRight(){
		
		if(this.pm.SRS(true)){
			this.c.startSE(1);
		}
		this.createGhost();

	}

    spinLeft(){
		
		if(this.pm.SRS(false)){
			this.c.startSE(2);
		}
		this.createGhost();

	}

    hold(){
		
		if(!this.pm.visible || this.pm.stop || this.pm.fixed || this.pm.invalidate){
			
			return;
			
		}
				
		if(this.holdKind == 0){
			
			this.holdKind = this.pm.kind;
			this.c.holdPanel.display(this.holdKind);
			this.pm.remove();
			this.newMond();
			
		}else{
			
			this.pm.remove();
			
			let buffer = this.pm.kind;
			this.pm.setKind(this.holdKind);
			this.holdKind = buffer;
			this.c.holdPanel.display(this.holdKind);
			
			this.pm.initialize();
			this.pm.display();
            this.createGhost();

		}

		this.c.startSE(6);
		
	}

    removeLine(){
		
		if(this.pm.fixed || this.pm.invalidate){
			
			return;
			
		}
				
		this.pm.remove();
		
		this.trick.setOrdinalByArray(this.c.removeLine());
		
		if(this.trick.ordinal != null && this.mode != 3 || this.trick.ordinal == this.trickGoal.ordinal && this.mode == 3){
			
			let point = this.trick.getPoint();
			let surplus = this.time1 + point + (this.chain > 0 ? 1 : 0) - this.initialTime;
			
			if(surplus > 0){
				
                this.timeChange(this.initialTime - this.time1);
				this.scoreUp(point * 100 + surplus * 20 + this.chain * 20);
				
			}else{
				
                this.timeChange(point + (this.chain > 0 ? 1 : 0));
				this.scoreUp(point * 100 + this.chain * 20);
				
			}
			
			this.c.setTrickElement(this.trick.getName() + (this.chain > 0 ? ("　" + this.chain + "Chain") : ""));
			this.penaltyCount = 0;
			this.chain++;
			
			if(this.trick.ordinal == 0 || this.trick.ordinal == 1){
				
				this.lineCount++;
				
				if(this.mode == 1){
					
				    this.c.setLineInformElement(this.lineCount);
				
					if(this.lineCount == 15){

						this.c.setTrickElement("Clear!");
						clearInterval(this.timer2);
						this.gameover();
						if(this.c.mode1Time == null || this.time2 < this.c.mode1Time){
							this.c.mode1Time = this.time2;
							localStorage.setItem("mode1Time", this.time2);
						}			
					}
					
				}
				
			}
			
			if(this.mode == 3){
				
                this.trickGoal.setOrdinal(this.trickGoal.getRandomOrdinal());
                this.c.setTrickGoalElement(this.trickGoal.getName());
                this.c.trickPanel.display(this.trickGoal.ordinal);
				
			}

			this.c.startSE(7);
			
		}else{
			
			if(this.mode == 2){
				
				if(this.score >= this.penaltyCount * 100){
					
					this.scoreUp(-this.penaltyCount * 100);
					
				}else{
					
					this.scoreUp(-this.score);
					
				}
				
			}
			
			if(this.penaltyCount == 0){
				
				this.penaltyCount = 3;
				
			}else{
				
				this.timeChange(-this.penaltyCount);
				this.penaltyCount = 3;
				
			}
						
			this.c.setTrickElement("");
			this.c.startSE(8);
			
		}
		
		this.pm.initialize();
		this.pm.display();
		this.createGhost();
		this.prev = 0;
		
	}

    gameover(){
		
		this.pm.remove();
		this.pm.setInvalidate(true);
		this.c.resetGhost();
		this.c.grayBlock();
		this.c.setVisible("reset");
		this.finish = true;
		
	}

    pause(){
		
		if(this.pm.invalidate || this.pausing){
			
			return;
			
		}
		
        clearInterval(this.timer1);
        clearInterval(this.timer2);
		this.c.setPage(6);
		this.pm.setInvalidate(true);
		this.pauseTime = Date.now();
		this.pausing = true;
		
	}

    reopening(){
		
		if(!this.pausing){
			
			return;
			
		}
				
		this.c.setPage(-1);
		this.startTime += Date.now() - this.pauseTime;
		this.pm.setInvalidate(false);
		this.pausing = false;
		this.c.setVisible("score");
		this.c.setVisible("trick");
		
		if(this.mode == 0){
			
			this.startTimer1();
			
		}
		
		if(this.mode == 1){
			
			this.startTimer2();
            this.c.setVisible("lineInform");

		}
		
		if(this.mode == 2){
			
			this.startTimer2();
			
		}
		
		if(this.mode == 3){
			
			this.startTimer1();
            this.c.setVisible("trickGoal");
			this.c.setVisible("tp1");
			
		}
		
	}

	unPut(){

		if(this.prev == 0 || this.pm.fixed || this.pm.invalidate){
			return;
		}

		this.scoreUp(-10);
		this.timeChange(-3);

		this.prevPm.remove();
		this.pm.remove();
		let prevKind = this.unShiftNext();
		this.pm = new Pentiamond(this.c);
		this.pm.setKind(prevKind);
		this.pm.initialize();
		this.pm.display();
		this.createGhost();

		this.c.startSE(5);

	}

    createGhost(){
		
		this.c.resetGhost();
		
		if((!this.pm.visible || this.pm.stop || this.pm.fixed || this.invalidate) && !this.pausing){
			
			return;
			
		}
		
		this.pm.setInvalidate(false);
		this.pm.remove();
		let clone = new Pentiamond(this.c);
		clone.setProperty(this.pm.x, this.pm.y, this.pm.dir, this.pm.kind);
		clone.display();
		clone.put();
		clone.turnToGhost();
		this.pm.display();
		
		if(this.pausing){
			
			this.pm.setInvalidate(true);
			
		}
		
	}

    mix(){

		for(let i = 0; i < 100; i++){

			let a = Math.floor(Math.random() * 6);
			let b = Math.floor(Math.random() * 6);
			let c = this.next2[a];
			let d = this.next2[b];
			this.next2[a] = d;
			this.next2[b] = c;

		 }

     }

    shiftNext(){
		
		let buffer = this.next[0];
		this.next[0] = this.next[1];
		this.next[1] = this.next[2];
		this.next[2] = this.next[3];
		this.next[3] = this.next[4];
		this.next[4] = this.next[5];
		this.next[5] = this.next2[0];
		this.next2[0] = this.next2[1];
		this.next2[1] = this.next2[2];
		this.next2[2] = this.next2[3];
		this.next2[3] = this.next2[4];
		this.next2[4] = this.next2[5];
		
		this.nextCount++;
		
		if(this.nextCount == 6){
			
			this.next2 = [1, 2, 3, 4, 5, 6];
			this.mix();
			this.nextCount = 0;
			
		}
		
		for(let i = 0; i < this.c.next; i++){
			
            this.c.nextPanel[i].display(this.next[i]);
			
		}
		
		return buffer;
		
	}

    unShiftNext(){

		if(this.prev == 0){
			return;
		}
		let buffer = this.prev;
		
		this.next2[5] = this.next2[4];
		this.next2[4] = this.next2[3];
		this.next2[3] = this.next2[2];
		this.next2[2] = this.next2[1];
		this.next2[1] = this.next2[0];
		this.next2[0] = this.next[5];
		this.next[5] = this.next[4];
		this.next[4] = this.next[3];
		this.next[3] = this.next[2];
		this.next[2] = this.next[1];
		this.next[1] = this.next[0];
		this.next[0] = this.pm.kind;
		
		this.nextCount--;
		
		if(this.nextCount == -1){
			
			this.nextCount = 5;
			
		}
		
		for(let i = 0; i < this.c.next; i++){
			
            this.c.nextPanel[i].display(this.next[i]);
			
		}

		this.prev = 0;
		this.prevPm = null;
		
		return buffer;
		
	}

    startTimer1(){
		
		this.timer1 = setInterval(this.reloadTime1.bind(this), 50);
		
	}

    startTimer2(){
		
		this.timer2 = setInterval(this.reloadTime2.bind(this), 10);		
		
	}

    reloadTime1(){
		
		if(this.mode != 0 && this.mode != 3){
			
			return;
			
		}
		
        this.time1 = this.initialTime - Math.floor((Date.now() - this.startTime) / this.c.timeRate) - this.penalty;
		
		if(this.time1 <= 0){
				
			this.time1 = 0;
			clearInterval(this.timer1);
			this.gameover();
			if(this.mode == 0 && (this.c.mode0Score == null || this.c.mode0Score < this.score)){
				this.c.mode0Score = this.score;
				localStorage.setItem("mode0Score", this.score);
			}
			if(this.mode == 3 && (this.c.mode3Score == null || this.c.mode3Score < this.score)){
				this.c.mode3Score = this.score;
				localStorage.setItem("mode3Score", this.score);
			}			
	    }
		
		this.c.setTimeElement(this.time1);
		
	}

    reloadTime2(){
		
		if(this.mode != 1 && this.mode != 2){
			
			return;
			
		}
		
		if(this.score >= 20000 && this.mode == 2){
			
			this.score = 20000;
			this.c.setScoreElement(20000);
			this.c.setTrickElement("Clear!");
			clearInterval(this.timer2);
			this.gameover();
			if(this.c.mode2Time == null || this.time2 < this.c.mode2Time){
				this.c.mode2Time = this.time2;
				localStorage.setItem("mode2Time", this.time2);
			}
			
		}
		
        this.time2 = Date.now() - this.startTime;
		let timeRounded = Math.floor(this.time2 / 10);
		this.c.setTimeElement(Math.floor(timeRounded / 100) + "." + ((timeRounded % 100) < 10 ? "0" + timeRounded % 100 : timeRounded % 100));
		
	}

    timeChange(dif){
		
		if(this.pm.invalidate || this.mode != 0 && this.mode != 3){
			
			return;
			
		}
		
		if(this.mode == 3 && dif < 0){
		  
			return;
			
		}
			
        this.penalty -= dif;
		this.reloadTime1();
		
	}

    scoreUp(up){
		
		if(this.pm.invalidate){
			
			return;
			
		}
		
		this.score += up;
		this.c.setScoreElement(this.score);
		
	}

}