import LinkedList from "./LinkedList";

interface Weighted {
    weight:number
}

export class MinPriorityStack<T extends Weighted> {
    private list:LinkedList<T> = new LinkedList<T>



    //Very bad complexity but is fine for low list size
   push(element: T) {
    for (let i = 0; i < this.list.size; i++) {
        if (element.weight >= this.list.get(i).weight) {
            this.list.insertAt(element, i);
            return;
        }
    }
    
    this.list.insertAt(element, this.list.size);
}

    pop():T {
        const removedItem = this.list.get(this.list.size -1)
        this.list.removeAt(this.list.size-1) //underlying code handles case where list is size 0
        return removedItem!
    }


    get peek():(T) {
        let listSize = this.list.size
        return this.list.get(listSize-1)
    }

    get size() : number {return this.list.size}


     get(index:number):T {
        if (index <= this.list.size - 1) return this.list.get(index)
        
        
        else throw new Error("Index out of bounds")
        
    }


   

}