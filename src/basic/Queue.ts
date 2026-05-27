import LinkedList from "./LinkedList";

export default class Queue<T>{
    private list:LinkedList<T> = new LinkedList<T>;

    enqueue(element: T){
        return this.list.insertBack(element);
    }

    size(){
        return this.list.size;
    }

    dequeue(){
        let head = this.list.get(0);
        if (this.list.removeAt(0) === true){
            return head;
        }else{
            return null;
        }
    }

    peek(){
        return this.list.head;
    }

    isEmpty(){
        return this.list.isEmpty();
    }
}