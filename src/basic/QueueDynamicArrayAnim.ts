import { Engine, MessagesObject } from "~/engine";
import { DynamicArray } from "~/basic/dynamicArray";
import { TextCircle } from "~/objects/text-circle";
import { Collection } from "~/collections";

export const QueueMessages = {
    general: {
        empty: "Array is empty!",
        full: "Array is full!",
        finished: "Finished",
    },
    insert: {
        start: (value: string) => `Array is empty, Enqueue value: ${value}, at index 0`,
        value: (value: string) => `Enqueue value: ${value}, at index after tail`,
        movePointer: (value: string) => `Moving ${value} pointer`
    },
    copy: {
        index: (index: number) => `Copying index: ${index}`,
        start: "Copy values to the new array, starting at head",
        head: "Copy head pointer to index 0",
        tail: (index: number) => `Copy tail pointer to last non-empty index: ${index}`,
        newSize: (size: number) => `Creating new Dynamic Array of length: ${size}`,
    },
    delete: {
        delete: `Dequeueing value at head pointer`,
        removePointer: (value: string) => `Removing ${value} pointer`,
        movePointer: (value: string) => `Moving ${value} pointer`
    },
} as const satisfies MessagesObject;

export class QueueDynamicArrayAnim extends Engine implements Collection {
    initialValues: Array<string> = [];
    dArray: DynamicArray;
    count: number = 0;
    tail: number = 0;
    head: number = 0;
    messages: MessagesObject = QueueMessages;

    constructor(containerSelector: string) {
        super(containerSelector);
        this.dArray = new DynamicArray(0, this.getObjectSize()); // Only added to make sure that dArray never is null
    }

    initialise(initialValues = []) {
        this.initialValues = initialValues;
        super.initialise();
    }

    async resetAlgorithm() {
        await super.resetAlgorithm();
        this.count = 0;
        const [xRoot, yRoot] = this.getTreeRoot();
        this.dArray = this.Svg.put(
            new DynamicArray(1, this.getObjectSize())
        ).init(1, xRoot, yRoot + this.$Svg.margin * 1.5);
        this.Svg.put(this.dArray);
        this.dArray.setDisabled(0, false);
        if (this.initialValues) {
            this.state.runWhileResetting(
                async () => await this.insert(...this.initialValues)
            );
        }
    }

    async insert(...values: Array<number | string>) {
        for (const val of values) {
            await this.insertOne(val);
        }
    }

    async resize(length: number){
        const [xRoot, yRoot] = this.getTreeRoot();
        let newArray = 
        this.Svg.put(
            new DynamicArray(this.dArray.getSize(), this.getObjectSize())
        ).init(0, xRoot, yRoot + this.$Svg.margin * 6);
        newArray.setSize(length);
        newArray.center(
        this.getTreeRoot()[0],
        this.getTreeRoot()[1] + this.$Svg.margin * 4 + this.getObjectSize() * 4
        );
        newArray.y(this.getTreeRoot()[1] + this.$Svg.margin * 1.5 + this.getObjectSize() + Number(this.dArray.height()));
            
        await this.pause("copy.newSize", length);

        await this.pause("copy.start");

        let i = this.head;
        for(let ii = 0; ii < this.count; ii++){
            console.log(i);
            let val = this.dArray.getValue(i)
            const arrayLabel = this.Svg.put(
                new TextCircle(val, this.getObjectSize(), this.getStrokeWidth())
            ).init(this.dArray.getCX(i), this.dArray.getCY(i));

            await this.pause("copy.index", i);

            arrayLabel.setCenter(
            newArray.getCX(ii),
            newArray.getCY(ii),
            this.getAnimationSpeed()
            );

            await this.pause(undefined);

            arrayLabel.remove();
                
            newArray.setValue(ii, val);
            i = (i + 1) % this.dArray.getSize();
        }

        if(length != 1){ //only resizes if it has an arrow
            newArray.addArrow(0, "head",  "#C00");
            this.head = 0;
            await this.pause("copy.head");
            
            newArray.addArrow(this.count - 1, "tail",  "#4C0");
            this.tail = this.count - 1;
            await this.pause("copy.tail", this.tail);
        }

        this.dArray.remove();
        this.dArray = newArray;
        this.animate(this.dArray, !this.state.isResetting()).center(
        this.getTreeRoot()[0],
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );
        this.animate(this.dArray, !this.state.isResetting()).y(
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );

        await this.pause(undefined);
    }

    async insertOne(value: number | string) {
        console.log("count = " + this.count);
        if(this.count >= this.dArray.getSize()){
            await this.pause("Dynamic Array is full!");
            await this.resize(this.count * 2);
        }
        value = String(value);
        const arrayLabel = this.Svg.put(
            new TextCircle(value, this.getObjectSize(), this.getStrokeWidth())
        ).init(...this.getNodeStart());

        if(this.count == 0){
            await this.pause("insert.start", value);
        }
        else {
            await this.pause("insert.value", value);
        }
            

        let currentIndex = (this.tail + 1) % this.dArray.getSize()
        if(this.count == 0){
            currentIndex = 0;
        }
        arrayLabel.setCenter(
            this.dArray.getCX(currentIndex),
            this.dArray.getCY(currentIndex),
            this.getAnimationSpeed()
        );
        await this.pause(undefined);
        if(this.count == 0){
            
            this.dArray.addArrow(0, "tail", "#C00");
            this.tail = 0;
            await this.pause("Creating tail pointer");
            this.dArray.addArrow(0, "head", "#4F0");
            this.head = 0;
            await this.pause("Creating head pointer");
        }
        else{
            this.tail = currentIndex;
            this.dArray.moveArrow("tail", currentIndex);
            await this.pause("insert.movePointer", "tail");
        }

        arrayLabel.remove();
        this.dArray.setDisabled(currentIndex, false);
        this.dArray.setValue(currentIndex, value);
        this.dArray.setIndexHighlight(currentIndex, true);
        this.count++;
        this.dArray.setIndexHighlight(currentIndex, false);

        await this.pause(undefined);
    }

    async find(...values: (string | number)[]): Promise<void> {
        
    }

    async delete(value: string | number): Promise<void> {
        const index = this.head;
        if(index >= 0){
            await this.pause("delete.delete");
            this.dArray.setIndexHighlight(index, true);
            this.dArray.setIndexHighlight(index, false);
            this.dArray.setValue(index, "");
            this.count--;
            if(this.count != 0){
                await this.pause("delete.movePointer", "head");
                this.dArray.moveArrow("head", (index + 1) % this.dArray.getSize());
            }
            else{
                await this.pause("delete.removePointer", "tail");
                this.tail = 0;
                this.dArray.removeArrow("tail");
                await this.pause("delete.removePointer", "head");
                this.head = 0;
                this.dArray.removeArrow("head");
            }
            
            this.head = (this.head + 1) % this.dArray.getSize();
            if(this.count != 0 && this.count <= this.dArray.getSize() / 4){
                await this.pause("Array is less than 1/4 full!");
                await this.resize(this.dArray.getSize() / 2);
            }
        }
        await this.pause(undefined);

    }
    
    async print() {
        throw new Error("Print not implemented");
    }
}
