const IBGM = class {
    constructor(src, { loopStart = null, loopEnd = null } = {}) {
        this.src = src;
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;
        this.context = new AudioContext();
        this.context.suspend();

        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);

        this.volume = 1;
    }

    // 音源を読み込む
    async fetch() {
        const response = await fetch(this.src);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.context.decodeAudioData(arrayBuffer);
    }

    // 最初のplay前の処理
    reset() {
        if (this.audio != null) {
            this.audio.stop();
            this.audio.disconnect();
            this.audio.onended = undefined;
        }

        this.audio = this.context.createBufferSource();
        this.audio.buffer = this.audioBuffer;
        this.audio.loop = true;
        this.audio.loopStart = this.loopStart ?? 0;
        this.audio.loopEnd = this.loopEnd ?? this.audioBuffer?.duration ?? 10000;
        this.audio.connect(this.gain);

        this.audio.start();
    }

    play() {
        this.gain.gain.value = this.volume;
        return this.context.resume();
    }

    pause() {
        return this.context.suspend();
    }

    setVolume(volume) {
        if (volume != null) this.volume = volume;
        this.gain.gain.value = this.volume;
    }
}
