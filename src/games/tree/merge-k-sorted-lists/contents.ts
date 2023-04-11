export const title = "Merge K Sorted Lists";

export const minHeap = `class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

class MinHeap {
    private items: ListNode[];

    constructor() {
        this.items = [];
    }

    push(item: ListNode) {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        const root = this.items.shift();
        const last = this.items.pop();
        if (last) {
            this.items.unshift(last);
        }
        this.bubbleDown(0);
        return root;
    }

    nonEmpty() {
        return this.items.length > 0;
    }

    private bubbleDown(index: number) {
        let target = index;

        const leftChildIndex = 2 * index + 1;
        if (
            this.items[target] &&
            this.items[leftChildIndex] &&
            this.items[target].val > this.items[leftChildIndex].val
        ) {
            target = leftChildIndex;
        }

        const rightChildIndex = 2 * index + 2;
        if (
            this.items[target] &&
            this.items[rightChildIndex] &&
            this.items[target].val > this.items[rightChildIndex].val
        ) {
            target = rightChildIndex;
        }

        if (target !== index) {
            this.swap(index, target);
            this.bubbleDown(target);
        }
    }

    private bubbleUp(index: number) {
        if (index < 1) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.items[index].val < this.items[parentIndex].val) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    private swap(i: number, j: number) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}`;

export const mergeKLists = `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

    const minHeap = new MinHeap();
    lists.forEach(node => {
        if (node) {
            minHeap.push(node);
        }
    });

    const head = new ListNode();
    let tail = head;
    while (minHeap.nonEmpty()) {
        const current = minHeap.pop();
        tail.next = current;
        tail = current;
        if (current.next) {
            minHeap.push(current.next);
        }
    }

    return head.next;
};`;

export const formula = `/**
* Definition for singly-linked list.
* class ListNode {
*     val: number
*     next: ListNode | null
*     constructor(val?: number, next?: ListNode | null) {
*         this.val = (val===undefined ? 0 : val)
*         this.next = (next===undefined ? null : next)
*     }
* }
*/
class MinHeap {
   private items: ListNode[];

   constructor() {
       this.items = [];
   }

   push(item: ListNode) {
       this.items.push(item);
       this.bubbleUp(this.items.length - 1);
   }

   pop() {
       const root = this.items.shift();
       const last = this.items.pop();
       if (last) {
           this.items.unshift(last);
       }
       this.bubbleDown(0);
       return root;
   }

   nonEmpty() {
       return this.items.length > 0;
   }

   private bubbleDown(index: number) {
       let target = index;

       const leftChildIndex = 2 * index + 1;
       if (
           this.items[target] &&
           this.items[leftChildIndex] &&
           this.items[target].val > this.items[leftChildIndex].val
       ) {
           target = leftChildIndex;
       }

       const rightChildIndex = 2 * index + 2;
       if (
           this.items[target] &&
           this.items[rightChildIndex] &&
           this.items[target].val > this.items[rightChildIndex].val
       ) {
           target = rightChildIndex;
       }

       if (target === index) {
           return;
       }

       this.swap(index, target);
       this.bubbleDown(target);
   }

   private bubbleUp(index: number) {
       if (index < 1) {
           return;
       }
       const parentIndex = Math.floor((index - 1) / 2);
       const current = this.items[index];
       const parent = this.items[parentIndex];
       if (current.val < parent.val) {
           this.swap(index, parentIndex);
           this.bubbleUp(parentIndex);
       }
   }

   private swap(i: number, j: number) {
       [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
   }
}


function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

   const minHeap = new MinHeap();
   lists.forEach(node => {
       if (node) {
           minHeap.push(node);
       }
   });

   const head = new ListNode();
   let tail = head;
   while (minHeap.nonEmpty()) {
       const current = minHeap.pop();
       tail.next = current;
       tail = current;
       if (current.next) {
           minHeap.push(current.next);
       }
   }

   return head.next;
};`;

export const description = `
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.
`;

export const solution = ``;

export const usecases = '';

export const example = `
`;
