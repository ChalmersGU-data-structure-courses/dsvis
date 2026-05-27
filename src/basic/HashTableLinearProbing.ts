import { Engine, MessagesObject } from "~/engine";
import { hashTable } from "~/basic/hashTable";
import { TextCircle } from "~/objects/text-circle";
import { Collection } from "~/collections";

export const HashTableMessages = {
    insert: {
        value: (value: string) => `Insert value: ${value}`,
    },
    find: {
        start: (element: string | number) => `Searching for ${element}`,
        found: (element: string | number) => `Found ${element}`,
        notfound: (element: string | number) => `Did not find ${element}`,
        lookStart: (index: string | number) =>
            `Looking into index: ${index}`,
        look: (index: string | number) =>
            `Looking into the next index: ${index}`,
        read: (element: string | number) =>
            `Reading the value of the index: ${element}`,
        nonExistent: (element: string | number) =>
            `Element ${element} does not exist`,
        notEmpty: (index: number) => `Index: ${index} is not empty`,
    },
    hash: {
        hash: (info: [string, string]) => `Hash value of ${info[0]}: ${info[1]}`,
        mod: (length: number) => `Mod hash value by length of hash table: ${length}`,
        start: (index: number) => `Start probing at index: ${index}`,
    },
    copy: {
        index: (index: number) => `Copying to index: ${index}`,
        newSize: (size: number) => `Creating new Hash Table of length: ${size}`,
    },
    delete: {
        delete: (value: string) => `Deleting ${value}`,
    },
} as const satisfies MessagesObject;

export class HashTableLinearProbing extends Engine implements Collection {
    initialValues: Array<string> = [];
    hashTable: hashTable;
    metadataArray: number[] = []; // metadata array of the same length as the hash table. 0 = empty, 1 = removed, 2 = filled
    loadFactor: number = 0;
    usinghash: number = 0;
    messages: MessagesObject = HashTableMessages;
    
    constructor(containerSelector: string) {
        super(containerSelector);
        this.hashTable = new hashTable(0, this.getObjectSize()); // Only added to make sure that hashTable never is null
        
    }

    initialise(initialValues = []) {
        this.initialValues = initialValues;
        super.initialise();
    }

    async resetAlgorithm() {
        await super.resetAlgorithm();
        const dropdown = document.getElementById("hashFunction") as HTMLSelectElement;
        this.usinghash = Number(dropdown.value);
        this.loadFactor = 0;
        const [xRoot, yRoot] = this.getTreeRoot();
        this.hashTable = this.Svg.put(
            new hashTable(8, this.getObjectSize())
        ).init(1, xRoot, yRoot + this.$Svg.margin * 1.5).setSize(8);
        this.hashTable.center(
        this.getTreeRoot()[0],
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );
        this.hashTable.y(
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );
        this.Svg.put(this.hashTable);
        this.hashTable.setDisabled(0, false);
        if (this.initialValues) {
            this.state.runWhileResetting(
                async () => await this.insert(...this.initialValues)
            );
        }
        this.metadataArray = Array(8).fill(0);
    }

    async insert(...values: Array<number | string>) {
        for (const val of values) {
            await this.insertOne(val);
        }
    }

    async resize(length: number){

        const [xRoot, yRoot] = this.getTreeRoot();

        let newTable = 
        this.Svg.put(
            new hashTable(this.hashTable.getSize(), this.getObjectSize())
        ).init(0, xRoot, yRoot + this.$Svg.margin * 6);
        newTable.setSize(length);

        let newmetaArray = Array(length).fill(0);

        newTable.center(
        this.getTreeRoot()[0],
        this.getTreeRoot()[1] + this.$Svg.margin * 4 + this.getObjectSize() * 4
        );
        newTable.y(this.getTreeRoot()[1] + this.$Svg.margin * 1.5 + this.getObjectSize() + Number(this.hashTable.height()));
            
        await this.pause("copy.newSize", length);

        await this.pause("Copy values to the new array");

        for(let i = 0; i < this.hashTable.getSize(); i++){
            let val = this.hashTable.getValue(i)
            if(this.metadataArray[i] == 2){
                const indexLabel = this.Svg.put(
                    new TextCircle(val, this.getObjectSize(), this.getStrokeWidth())
                ).init(this.hashTable.getCX(i), this.hashTable.getCY(i));

                let newIndex = await this.hash(val, newTable);

                await this.pause("copy.index", newIndex);

                newTable.setIndexHighlight(newIndex, true); //rehash and prob when resizing

                while(newmetaArray[newIndex] == 2){     // loop until an empty array is found
                    await this.pause("find.notEmpty", newIndex);
                    newTable.setIndexHighlight(newIndex, false);
                    newIndex = (newIndex + 1) % newTable.getSize();
                    newTable.setIndexHighlight(newIndex, true);
                    await this.pause("find.look", newIndex);
                }
                await this.pause("Found empty index");

                newTable.setIndexHighlight(newIndex, false);

                indexLabel.setCenter(   // move the inserted value to the index of the array
                newTable.getCX(newIndex),
                newTable.getCY(newIndex),
                this.getAnimationSpeed()
                );

                await this.pause(undefined);

                indexLabel.remove();
                    
                newTable.setValue(newIndex, val);
                newmetaArray[newIndex] = 2;

                await this.pause(undefined);
            }
        }

        this.hashTable.remove();
        this.hashTable = newTable;
        this.metadataArray = newmetaArray;
        this.animate(this.hashTable, !this.state.isResetting()).center(
        this.getTreeRoot()[0],
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );
        this.animate(this.hashTable, !this.state.isResetting()).y(
        this.getTreeRoot()[1] + this.$Svg.margin * 1.5
        );


        await this.pause(undefined);
    }

    async insertOne(value: number | string) {
        
        if(this.loadFactor >= this.hashTable.getSize() * 0.75){     // grow array if a load factor > 75%
            await this.pause("Load Factor exceeded!");
            await this.resize(this.hashTable.getSize() * 2);
        }

        value = String(value);
        const indexLabel = this.Svg.put(    // create label for the value that is inserting
            new TextCircle(value, this.getObjectSize(), this.getStrokeWidth())
        ).init(...this.getNodeStart());
        await this.pause("insert.value", value);

        let currentIndex = await this.hash(value, this.hashTable);
        this.hashTable.setIndexHighlight(currentIndex, true);

        await this.pause("find.lookStart", currentIndex);

        while(this.metadataArray[currentIndex] == 2){  // while loop to look for empty space
            await this.pause("find.notEmpty", currentIndex);
            this.hashTable.setIndexHighlight(currentIndex, false);
            currentIndex = (currentIndex + 1) % this.hashTable.getSize();
            this.hashTable.setIndexHighlight(currentIndex, true);
            await this.pause("find.look", currentIndex);
        }

        await this.pause("Found empty index");
        
        indexLabel.setCenter(   // move the inserted value to the index of the array
            this.hashTable.getCX(currentIndex),
            this.hashTable.getCY(currentIndex),
            this.getAnimationSpeed()
        );
        
        await this.pause(undefined);

        indexLabel.remove();
        this.hashTable.setDisabled(currentIndex, false);
        this.hashTable.setValue(currentIndex, value);
        this.loadFactor++;
        this.metadataArray[currentIndex] = 2;
        this.hashTable.setIndexHighlight(currentIndex, false);

        await this.pause(undefined);
    }

    async find(...values: (string | number)[]): Promise<void> {
        for (const val of values) {
            await this.findOne(val);
        }
    }

    async findOne(value: string | number): Promise<number | null> {
        await this.pause("find.start", value); //start the search
        value = String(value)

        let curIndex = await this.hash(value, this.hashTable);

        this.hashTable.setIndexHighlight(curIndex, true);

        await this.pause("find.read", curIndex);

        while(this.metadataArray[curIndex] != 0 ){
            if(this.metadataArray[curIndex] == 2 && value == this.hashTable.getValue(curIndex)){
                await this.pause("find.found", value);
                this.hashTable.setIndexHighlight(curIndex, false);
                return curIndex;
            }
            else{
                await this.pause("find.notfound", value); //not found
                this.hashTable.setIndexHighlight(curIndex, false);
                curIndex = (curIndex + 1) % this.hashTable.getSize();
                this.hashTable.setIndexHighlight(curIndex, true);
                await this.pause("find.look", curIndex);
            }
        }
        this.hashTable.setIndexHighlight(curIndex, false);
        await this.pause("find.nonExistent", value);
        return null;
    }

    async delete(value: string | number): Promise<void> {
        if(value != undefined){
            const index = await this.findOne(value);

            if(typeof index === "number"){
                this.hashTable.setIndexHighlight(index, true);
                await this.pause("delete.delete", value);
                this.hashTable.setValue(index, "DEL");
                this.loadFactor--;
                this.metadataArray[index] = 1;
                this.hashTable.setIndexHighlight(index, false);
                this.hashTable.setDisabled(index, true);

                if(this.loadFactor < this.hashTable.getSize() * 0.25 && this.hashTable.getSize() > 8){
                    await this.resize(this.hashTable.getSize() / 2);
                }
                
            }
            await this.pause(undefined);
        }
    }
    

    async hash(value: string, arr: hashTable): Promise<number> {
        const hashingText = this.Svg.text(String(this.hashString(value))) // create the number that represents the hash value
        hashingText.font({size: this.getObjectSize() * 0.37});
        hashingText.addClass("highlight"); 
        hashingText.center(this.getNodeStart()[0], this.getNodeStart()[1]);
        this.animate(hashingText, !this.state.isResetting()).center(this.getNodeStart()[0], this.getNodeStart()[1] + this.getObjectSize() * 2);

        await this.pause("hash.hash", [value, this.hashInfo(value)]);
        
        let currentIndex = this.hashString(value) % arr.getSize();

        hashingText.text(String(currentIndex));
        hashingText.center(this.getNodeStart()[0], this.getNodeStart()[1] + this.getObjectSize() * 2);

        
        await this.pause("hash.mod", arr.getSize());

        this.animate(hashingText, !this.state.isResetting())
        .center(arr.getCX(currentIndex), arr.getCY(currentIndex) + this.getObjectSize() * 0.8); // move to number to the same position as the array index

        await this.pause("hash.start", currentIndex);
        
        hashingText.remove();

        return currentIndex;
    }

    async print() {
        console.log("Print not implemented");
    }

    hashString(str: string): number { // gets the mathematical expression for the hash function
        let hash = 0;
        if(this.usinghash == 0){
            for (let i = 0; i < str.length; i++) {
              hash = (hash * 31 + str.charCodeAt(i)); 
            }
        }
        else if(this.usinghash == 1){
            hash = str.charCodeAt(0);
        }
        else if(this.usinghash == 2){
            for (let i = 0; i < str.length; i++) {
              hash = hash + str.charCodeAt(i); 
            }
        }
        return hash;
    }

    hashInfo(str: string): string { // gets the hash value 
        let hash = "";
        if(this.usinghash == 0){
            for (let i = 0; i < str.length; i++) {
                hash = hash + str.charCodeAt(i);
                if(i < str.length - 1){
                    hash = "(" + hash + ")" + " * 31 + ";
                }
            }
        }
        else if(this.usinghash == 1){
            hash = "str.charCodeAt(" + str.charAt(0) +  ")" + " = " + str.charCodeAt(0);
        }
        else if(this.usinghash == 2){
            for (let i = 0; i < str.length; i++) {
              hash = hash + str.charCodeAt(i); 
                if(i < str.length - 1){
                    hash = hash + " + ";
                }
            }
        }
        return hash;
    }
}
