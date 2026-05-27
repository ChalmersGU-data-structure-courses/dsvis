import { G, Rect, Text, Svg } from '@svgdotjs/svg.js';
import { NBSP } from "~/engine";
import { Polyline } from "@svgdotjs/svg.js";
import { LinkedNode } from "~/objects/basic-structure-objects/linked-node";
import { LinkedConnection } from "~/objects/basic-structure-objects/node-connection";
import { Connection } from '../objects/connection';

export class hashTable extends G {
    $horizontal: boolean;
    
    $nodeArrays: LinkedNode[][] = [];
    $connections: LinkedConnection[][] = [];
    $bound: Rect | undefined;

    $backgrounds: Rect[] = [];
    $values: Text[] = [];
    $indices: Text[] = [];

    constructor(size: number, objectSize: number, horizontal: boolean = true) {
        super();
        this.$horizontal = horizontal; 
        this.$values = new Array(size)
        this.$bound = new Rect();
        if (!horizontal){
            this.$bound = this.rect(2 * objectSize, objectSize * size)
        }
    }

    /*** Initiates the Hashtable with specified size 
     ** If vertical center around x & y coordinates */
    init(size: number, x: number, y: number) {
        if (this.$bound){
            this.$bound.center(x, y);
        }
        this.setSize(size);
        this.clear();
        return this;
    }


    /*** Returns number of elements that fit in a row*/ 
    getRowWidth() : number {
        if(this.$horizontal){
            return Math.floor((this.engine().$Svg.width - 7 * this.engine().$Svg.margin + 10) / (this.engine().getObjectSize() * 2));
        }else{
            return 1;
        }
        
    }

    /*** Calculates the x-coordinate based on index*/ 
    getCX(i: number): number {
        const maxPerLine = this.getRowWidth();
        const lineSize = Math.min(this.getSize(), maxPerLine);
        const objectSize = this.engine().getObjectSize() * 2;

        if (this.$horizontal || !this.$bound) {
            // Horizontal layout
            const col = i % maxPerLine;
            return this.cx() + objectSize * (col - lineSize / 2 + 0.5);
        } else {
            // vertical layout
            return this.$bound.cx();
        }
    }

    /*** Calculates the y-coordinate based on index*/ 
    getCY(i: number): number {
        const maxPerLine = this.getRowWidth();
        const objectSize = this.engine().getObjectSize();

        if (this.$horizontal || !this.$bound) {
            // Horizontal
            const row = Math.floor(i / maxPerLine);
            return Number(this.y()) +  objectSize * 0.5 + objectSize * 2 * row;
        } else {
            // Vertical
            return Number(this.$bound.y()) + objectSize/2 + objectSize*i;
        }
    }

    /** Returns total length of array// not number of values currently in the table*/
    getSize(): number {   
        return this.$values.length;    
    }

    /** Initializes the hashtable's SVG elements with the assigned size*/
    setSize(size: number) {
        while (size < this.getSize()) {
            this.$backgrounds.pop()?.remove();
            this.$values.pop()?.remove();
            this.$indices.pop()?.remove();
        }

        const cellWidth = this.engine().getObjectSize() * 2;
        const cellHeight = this.engine().getObjectSize();
        const rowWidth = Math.min(size, this.getRowWidth());
        const stroke = this.engine().getStrokeWidth();

        const cx = this.cx();
        let cy =  this.cy();

        if (!this.$horizontal) {
            this.$nodeArrays = new Array(size).fill(null).map(() => []);
            this.$connections = new Array(size).fill(null).map(() => []);
        }

        for (let i = 0; i < size; i++) {
            const x:number = this.getCX(i);
            const y:number = this.getCY(i);

            if(this.$horizontal){
                if(i % this.getRowWidth() == 0 && i != 0){
                    cy = cy + this.engine().getObjectSize() * 2; 
                }

                if (!this.$backgrounds[i]) {
                    this.$backgrounds[i] = this.rect(cellWidth, cellHeight)
                        .stroke({ width: stroke })
                        .addClass("background");
                }
                this.$backgrounds[i].center(cx + cellWidth * (i % this.getRowWidth() - rowWidth / 2 + 0.5), cy);

                if (!this.$values[i]) {
                    this.$values[i] = this.text(NBSP);
                }
                this.$values[i].center(cx + cellWidth * (i % this.getRowWidth() - rowWidth / 2 + 0.5), cy);

                if (!this.$indices[i]) {
                    this.$indices[i] = this.text(i.toString()).addClass(
                        "arrayindex"
                    );
                }
                this.$indices[i].center(
                    cx + cellWidth * (i % this.getRowWidth() - rowWidth / 2 + 0.5),
                    cy + cellHeight * 0.8
                );
            }else{
                if (!this.$indices[i]) {
                    this.$indices[i] = this.text(i.toString()).addClass(
                        "arrayindex"
                    );
                }
                this.$indices[i].center(
                    this.getCX(i) - cellWidth *0.8,
                    this.getCY(i)
                );
            } 
            
        }
        return this;
    }

    /*** Adds a new linked node at the indexed bin */
    addLinkedNode(index:number, value:string =""):LinkedNode{
        const nodeDimensions: [number, number] = [this.engine().getObjectSize() * 2, this.engine().getObjectSize()];
        const newNode = new LinkedNode(value, nodeDimensions, this.engine().getStrokeWidth())
        this.add(newNode);
        newNode.center(this.getCX(index) + this.engine().getObjectSize()*3* (this.$nodeArrays[index].length), this.getCY(index));
        
        this.$nodeArrays[index].push(newNode);
        if(this.$nodeArrays[index].length > 1){
            const previousNode = this.$nodeArrays[index][this.$nodeArrays[index].length-2];
            const linkedConnection = new LinkedConnection(
                previousNode, 
                newNode, 
                nodeDimensions, 
                this.engine().getStrokeWidth(), 
                this.engine().Svg
            );
            this.add(linkedConnection);
            this.$connections[index].push(linkedConnection);
        }
        return newNode;
    }

    /*** Removes indexed linked node from the linked list in the specified bin */
    async removeLinkedNode(binIndex: number, linkedindex:number){
        const nextNode = this.$nodeArrays[binIndex][linkedindex+1] as LinkedNode;
        const prevConnection = this.$connections[binIndex][linkedindex-1] as LinkedConnection; 

        this.$nodeArrays[binIndex][linkedindex].remove();
        this.$nodeArrays[binIndex].splice(linkedindex, 1);

        if (linkedindex === this.$nodeArrays[binIndex].length) {
            // If the node is the last one, remove the connection to the previous node
            this.$connections[binIndex][linkedindex-1].remove();
            this.$connections[binIndex].splice(linkedindex-1, 1); // Set the connection to null
        } else {
            // If the node is not the last one
            // Remove the connection to the next node
            this.$connections[binIndex][linkedindex].remove();
            this.$connections[binIndex].splice(linkedindex, 1);
            // Update the connection of the previous node to go to the next node
            
            this.adjustNodes(binIndex, linkedindex); 
            /* prevConnection.setEnd(nextNode, this.animationValue()); */
        }
    }

    /*** Adjusts the nodes after a node has been removed */
    adjustNodes(arrayindex: number, linkedindex:number){
        const right = this.$nodeArrays[arrayindex].slice(linkedindex);
        const conright = this.$connections[arrayindex].slice(linkedindex);

        for (const node of right) {
            // Move the node and link to the correct position with animation
            node.dMoveCenter(
                -this.engine().getObjectSize()*3,
                0,
                this.animationValue()
            );

            // Update the connection to the new position
        }
        for (const connection of conright){
            connection.dMoveCenter(
                -this.engine().getObjectSize()*3,
                0,
                this.animationValue()
            );
        }
    }

    /*** Gets animation value from engine */
    private animationValue(): number {
         const animate = !this.engine().state.isResetting()
        return animate ? this.engine().$Svg.animationSpeed : 0;
    }

    /*** Clears all values and removes SVG elements*/
    clear() {
        if(this.$horizontal){
            for (let i = 0; i < this.getSize(); i++) {
                this.setValue(i, "");
                this.setDisabled(i, true);
            }
        }

        for (let i = 0; i < this.$nodeArrays.length; i++) {
            for (const node of this.$nodeArrays[i]) {
                node.remove();
            }
            for (const conn of this.$connections[i]) {
                conn.remove();
            }
        }
        
        if (!this.$horizontal) {
            const size = this.getSize();
            this.$nodeArrays = new Array(size).fill(null).map(() => []);
            this.$connections = new Array(size).fill(null).map(() => []);
        }
        return this;
    }

    /*** Returns the indexed values from the hashtable (if horizontal) */
    getValues(i: number): string[]{
        return this.$nodeArrays[i].map(node => String(node.value));
    }

    /*** Returns the indexed value from the hashtable (if horizontal) */
    getValue(i: number): string {
        return this.$values[i].text();
    }

    /*** Sets the indexed value from the hashtable (if horizontal) */
    setValue(i: number, text: string) {
        if (this.$horizontal){
            if (text == null) {
                text = "";
            }
            text = `${text}`;
            // Non-breaking space: We need to have some text, otherwise the coordinates are reset to (0, 0)
            if (text === "") {
                text = NBSP;
            }
            this.$values[i].text(text);
            return this;
        }
    }

    /*** Swaps two elements in the hashtable (if horizontal)*/
    swap(j: number, k: number, animate: boolean = false) {
        const jText = this.$values[j],
            kText = this.$values[k];
        const jX = this.getCX(j),
            kX = this.getCX(k);
        this.engine().animate(jText, animate).cx(kX);
        this.engine().animate(kText, animate).cx(jX);
        this.$values[k] = jText;
        this.$values[j] = kText;
        return this;
    }

    /** What it do?*/
    setDisabled(i: number, disabled: boolean | null) {
        const bg = this.$backgrounds[i];
        if (disabled == null) {
            bg.toggleClass("disabled");
        } else if (disabled) {
            bg.addClass("disabled");
        } else {
            bg.removeClass("disabled");
        }
        return this;
    }

    /*** Highlights the value with inserted index*/
    setIndexHighlight(i: number, high: boolean, color: string = "#C00") {
        if (this.$backgrounds[i]) {

            
            if (high) {
                this.$backgrounds[i].addClass("highlight");
            } else {
                this.$backgrounds[i].removeClass("highlight");
            }
        }

        if (this.$values[i]) {
            if (high) {
                this.$values[i].addClass("highlight");
            } else {
                this.$values[i].removeClass("highlight");
            }
        }

        for (const bg of this.$backgrounds) {
            if (!bg.css("stroke")) {
                bg.back();
            }
        }

        if(!this.$horizontal){
            this.$nodeArrays[i][0].setHighlight(high)
            this.$indices[i].setHighlight(high)
        }
        return this;
    }

}
