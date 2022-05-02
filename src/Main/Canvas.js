import React, { Component, createRef } from 'react';
import songFile from "../audio/test.mp3";

// Changing Variables
let ctx, x_end, y_end, bar_height;
let point_arr = [];

// constants
const width = window.innerWidth;
const height = window.innerHeight;
const bars = 300;
const bar_width = 3;
const radius = 200;
const center_x = 540;
const center_y = height / 2;

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.audio = new Audio("https://ipfs.io/ipfs/" + props.musicCID);
        console.log(props.musicCID)
        console.log(this.audio)
        this.canvas = createRef();
        this.isInit = false;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    init(){
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);

        this.analyser = this.context.createAnalyser();
        // this.analyser.smoothingTimeConstant = 0.6;
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
        this.time_array = new Uint8Array(this.analyser.frequencyBinCount);

        this.isInit = true;
        // this.initCanvas();
        this.audio.play()
    }

    initCanvas() {
        var canvas = this.canvas.current;
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.drawRedCircle(ctx, canvas);
    }

    animationLooper(canvas) {
        point_arr = [];
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);        
        this.drawCircle(ctx, canvas);

        for (var i = 0; i < bars; i++) {
            //divide a circle into equal part
            const rads = Math.PI * 2 / bars;

            this.plotBars(rads, i, ctx, canvas);
            this.fillCurveArray(rads, i, point_arr);            
        }
        
        this.plotCurve(ctx, canvas);
    }

    plotBars(rads, i, ctx, canvas){
        bar_height = this.frequency_array[i] / 2;

        const x = center_x + Math.cos(rads * i) * (radius);
        const y = center_y + Math.sin(rads * i) * (radius);
        x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
        y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

        this.drawBar(x, y, x_end, y_end, this.frequency_array[i], ctx, canvas);
    }

    fillCurveArray(rads, i){
        let curve_height = this.time_array[i] / 2;
        let cx_end = center_x + Math.cos(rads * i) * (radius + curve_height);
        let cy_end = center_y + Math.sin(rads * i) * (radius + curve_height);

        point_arr.push({x: cx_end, y: cy_end});
    }

    plotCurve(ctx, canvas){
        console.log(point_arr.length);
        for(var i = 0; i < point_arr.length; i++){
            var point1 = point_arr[i];
            var point2 = point_arr[i+1 < point_arr.length ? i+1 : 0];
            this.drawBar(point1.x, point1.y, point2.x, point2.y, "", ctx, canvas);
        }
    }

    drawBar(x1=0, y1=0, x2=0, y2=0, frequency, ctx, canvas) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
        gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
        ctx.fillStyle = gradient;
        
        // var randomInt = this.getRandomInt(256);
        const lineColor = "rgb(" + this.getRandomInt(256) + ", " + this.getRandomInt(256) + ", " + this.getRandomInt(256) + ")";
        // const lineColor = "rgb(" + randomInt + ", " + randomInt + ", " + randomInt + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = bar_width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawCircle(ctx, canvas) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
        gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
        ctx.fillStyle = gradient;
        
        const lineColor = "teal";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(center_x, center_y, radius - 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    componentDidMount() {        
        var canvas = this.canvas.current;
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);  
        this.drawCircle(ctx, canvas);
    }

    togglePlay = () => {
        const { audio } = this;
        if(!this.isInit){
            this.init();
        }
        if(audio.paused) {
            audio.play();
            this.rafId = requestAnimationFrame(this.tick);

         } else {
            audio.pause();
            cancelAnimationFrame(this.rafId);
         }
    }

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.analyser.getByteTimeDomainData(this.time_array);
        this.analyser.getByteFrequencyData(this.frequency_array); //passing our Uint data array
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        return <>
            <button onClick={this.togglePlay}>Play/Pause</button>
            <canvas ref={this.canvas}  />
        </>
    }
}

export default Canvas;